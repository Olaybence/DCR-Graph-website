/*
 Basic DCR Engine supporting:
 - Condition, response, include, exclude, milestone
 - Single-instance subprocesses
 - Time
 - Guarded relations (BEWARE: guard expressions are evaluated with eval(), use at own risk.)
*/
class Marking {
  constructor(executed, included, pending) {
    this.executed = executed;
    this.included = included;
    this.pending = pending;
    this.lastExecuted = undefined;
    this.deadline = undefined;
    this.value;
  }

  toString() {
    return (
      "(" +
      (this.executed ? 1 : 0) +
      "," +
      (this.included ? 1 : 0) +
      "," +
      (this.pending ? 1 : 0) +
      ")"
    );
  }
}

class Event {
  constructor(n, l, p, g = new DCRGraph()) {
    this.children = g;
    this.loading = false;
    this.parent = p;
    this.name = n;
    this.label = l;
    this.events = new Set();

    this.marking = new Marking(false, true, false);

    this.conditions = new Set();
    this.respones = new Set();
    this.milestones = new Set();
    this.includes = new Set();
    this.excludes = new Set();
  }

  get isSubProcess() {
    return this.children.events.size > 0;
  }

  enabled() {
    if (this.parent instanceof Event) {
      if (!this.parent.enabled()) {
        return false;
      }
    }

    for (const e of this.events) {
      if (!e.isAccepting) {
        return false;
      }
    }

    if (!this.marking.included) {
      return false;
    }

    for (const r of this.conditions)
      if (eval(r.guard)) {
        const e = r.src;

        if (e.marking.included && !e.marking.executed) {
          return false;
        }

        if (r.delay !== undefined)
          if (r.delay > e.marking.lastExecuted) {
            return false;
          }
      }

    for (const r of this.milestones)
      if (eval(r.guard)) {
        const e = r.src;

        if (e.marking.included && e.marking.pending) {
          return false;
        }
      }

    return true;
  }

  canTimeStep(diff) {
    if (this.marking.deadline !== undefined) {
      return this.marking.deadline <= diff;
    }
  }

  timeStep(diff) {
    if (this.marking.lastExecuted !== undefined) {
      this.marking.lastExecuted += diff;
    }

    if (this.marking.deadline !== undefined) {
      this.marking.deadline -= diff;
    }
  }

  execute() {
    if (!this.enabled()) {
      return;
    }

    this.marking.executed = true;
    this.marking.pending = false;
    this.marking.deadline = undefined;
    this.marking.lastExecuted = 0;

    for (const r of this.respones)
      if (eval(r.guard)) {
        const e = r.trg;
        e.marking.pending = true;
        e.marking.deadline = r.deadline;
      }

    for (const r of this.excludes)
      if (eval(r.guard)) {
        const e = r.trg;
        e.marking.included = false;
      }

    for (const r of this.includes)
      if (eval(r.guard)) {
        const e = r.trg;
        e.marking.included = true;
      }

    if (this.parent instanceof Event) {
      if (this.parent.enabled()) this.parent.execute();
    }

    return;
  }

  isAccepting() {
    return !(this.marking.pending && this.marking.included);
  }
}

class DCRGraph {
  parent = undefined;
  parentGraphTemp = undefined;
  events = new Map();

  constructor(pg) {
    this.parentGraphTemp = pg;
  }

  parentGraph() {
    if (this.parent === undefined) {
      return this.parentGraphTemp;
    } else {
      return this.parent.parent;
    }
  }

  root() {
    if (this.parentGraph() !== undefined) {
      return this.parentGraph().root();
    } else {
      return this;
    }
  }

  removeEvent(o) {
    this.events.delete(o.name);

    for (const e of this.events.values()) {
      e.children.removeEvent(o);
    }
  }

  replaceEvent(o, n) {
    for (const e of this.events.values()) {
      if (e === o) {
        for (const r of o.conditions) {
          n.conditions.push(r);
        }

        for (const r of o.milestones) {
          n.milestones.push(r);
        }

        for (const r of o.respones) {
          n.respones.push(r);
        }

        for (const r of o.includes) {
          n.includes.push(r);
        }

        for (const r of o.excludes) {
          n.excludes.push(r);
        }

        delete this.events[e.name];
      }
      this.replaceInRelation(e.conditions, o, n);
      this.replaceInRelation(e.milestones, o, n);
      this.replaceInRelation(e.respones, o, n);
      this.replaceInRelation(e.includes, o, n);
      this.replaceInRelation(e.excludes, o, n);
    }
  }

  replaceInRelation(r, o, n) {
    for (const e of r) {
      if (e === o) {
        r.delete(o);
        r.add(n);
      }
    }
  }

  hasEvent(n) {
    return this.getEvent(n) !== undefined;
  }

  getEvent(n) {
    if (this.events.has(n)) {
      return this.events.get(n);
    }

    for (const e of this.events.values()) {
      if (e.children.getEvent(n) !== undefined) {
        return e.children.getEvent(n);
      }
    }

    return undefined;
  }

  addLoadingEvent(n) {
    if (this.hasEvent(n)) {
      return this.getEvent(n);
    }

    if (this.root().hasEvent(n)) {
      return this.root().getEvent(n);
    }

    const e = this.addEvent(n);
    e.loading = true;

    return e;
  }

  addEvent(
    n,
    l = n,
    m = { ex: false, in: true, pe: false },
    g = new DCRGraph()
  ) {
    let e;

    if (this.hasEvent(n) || this.root().hasEvent(n)) {
      e = this.hasEvent(n) ? this.getEvent(n) : this.root().getEvent(n);

      if (!e.loading) {
        throw new Error(
          "Event '" + n + "' is hard defined in more than one location!"
        );
      } else {
        this.removeEvent(e);
        this.root().removeEvent(e);
        e.label = l;
        e.parent = this;
        e.children = g;
      }
    } else {
      e = new Event(n, l, this, g);
    }

    this.events.set(n, e);
    g.parent = e;
    e.marking.executed = m.ex;
    e.marking.included = m.in;
    e.marking.pending = m.pe;

    if (m.deadline !== undefined) {
      e.marking.deadline = m.deadline;
    }

    if (m.lastExecuted !== undefined) {
      e.marking.lastExecuted = m.lastExecuted;
    }

    return e;
  }

  handleEvent(event) {
    return this.root().hasEvent(event)
      ? this.root().getEvent(event)
      : this.addLoadingEvent(event);
  }

  // src -->* trg
  addCondition(src, trg, delay = undefined, guard = true) {
    const eSrc = this.handleEvent(src);
    const eTrg = this.handleEvent(trg);

    eTrg.conditions.add({ src: eSrc, delay: delay, guard: guard });
  }

  // src --><> trg
  addMilestone(src, trg, guard = true) {
    const eSrc = this.handleEvent(src);
    const eTrg = this.handleEvent(trg);

    eTrg.milestones.add({ src: eSrc, guard: guard });
  }

  // src *--> trg
  addResponse(src, trg, deadline = undefined, guard = true) {
    const eSrc = this.handleEvent(src);
    const eTrg = this.handleEvent(trg);

    eSrc.respones.add({ trg: eTrg, deadline: deadline, guard: guard });
  }

  // src -->+ trg
  addInclude(src, trg, guard = true) {
    const eSrc = this.handleEvent(src);
    const eTrg = this.handleEvent(trg);

    eSrc.includes.add({ trg: eTrg, guard: guard });
  }

  // src -->% trg
  addExclude(src, trg, guard = true) {
    const eSrc = this.handleEvent(src);
    const eTrg = this.handleEvent(trg);

    eSrc.excludes.add({ trg: eTrg, guard: guard });
  }

  execute(e) {
    if (!this.hasEvent(e)) {
      return;
    }

    this.getEvent(e).execute();
  }

  isAccepting() {
    for (const e of this.events.values()) {
      if (!e.isAccepting()) {
        return false;
      }
    }

    return true;
  }

  canTimeStep(diff) {
    for (const e of this.events.values()) {
      if (!e.canTimeStep(diff)) {
        return false;
      }
    }

    return true;
  }

  timeStep(diff) {
    for (const e of this.events.values()) {
      e.timeStep(diff);
    }
  }

  status() {
    const result = [];
    for (const e of this.events.values()) {
      result.push({
        executed: e.marking.executed,
        pending: e.marking.pending,
        included: e.marking.included,
        enabled: e.enabled(),
        name: e.name,
        lastExecuted: e.marking.lastExecuted,
        deadline: e.marking.deadline,
        label: e.label,
      });
      for (const s of e.children.status()) {
        result.push({
          executed: s.executed,
          pending: s.pending,
          included: s.included,
          enabled: s.enabled,
          name: s.name,
          lastExecuted: s.lastExecuted,
          deadline: s.deadline,
          label: e.label + "." + s.label,
        });
      }
    }

    return result;
  }
}
