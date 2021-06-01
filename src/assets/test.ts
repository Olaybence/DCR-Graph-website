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
}

class DCRMarking {
  executed: Set<string> = new Set();
  included: Set<string> = new Set();
  pending: Set<string> = new Set();
}
