class DCRGraph {
  // Events
  events: Set<string> = new Set();

  // Relations
  conditionsFor: Record<string, Set<string>> = {};
  milestonesFor: Record<string, Set<string>> = {};
  responsesTo: Record<string, Set<string>> = {};
  excludesTo: Record<string, Set<string>> = {};
  includesTo: Record<string, Set<string>> = {};

  marking: DCRMarking;

  enabled(marking: DCRMarking, event: string): Boolean {
    // Open world assumption: if an event doesn't exist in the graph it must be enabled.
    if (!this.events.has(event)) {
      return true;
    }
    // check included
    if (!marking.included.has(event)) {
      return false;
    }
    // Select only the included conditions
    const inccon: Set<string> = new Set(this.conditionsFor[event]);
    // inccon.retainAll(marking.included);

    // Check if all included conditions have been executed
    if (![...marking.executed].every((e) => inccon.has(e))) {
      return false;
    }

    // Select only the included milestones
    const incmil: Set<string> = new Set(this.milestonesFor[event]);

    //  incmil.retainAll(marking.included);

    // Check if any included milestone has a pending response
    for (const p of this.marking.pending) {
      if (incmil.has(p)) {
        return false;
      }
    }
    return true;
  }

  execute(marking: DCRMarking, event: string): DCRMarking {
    // Check if the event exists
    if (!this.events.has(event)) {
      return marking;
    }

    // Check if the event is enabled
    if (!this.enabled(marking, event)) {
      return marking;
    }

    // Create a new marking
    const result: DCRMarking = marking.clone();

    // Add the event to the set of executed events.
    result.executed.add(event);

    // Remove the event from the set of pending events.
    result.pending.delete(event);

    // Add all new responses.
    result.pending = new Set([...result.pending, ...this.responsesTo[event]])

    // result.pending.addAll(this.responsesTo[event]);
    // Remove all excluded events
    result.included.removeAll(this.excludesTo[event]);
    // Add all included events
    result.included.addAll(this.includesTo[event]);

    return result;
  }
}

class DCRMarking {
  executed: Set<string> = new Set();
  included: Set<string> = new Set();
  pending: Set<string> = new Set();
}
