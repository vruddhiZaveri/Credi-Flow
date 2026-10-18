export type JourneyMetrics = Readonly<{
  opened: boolean;
  personalCompleted: boolean;
  submitted: boolean;
  validationAttempts: number;
  validationFailures: number;
}>;
export const initialJourney: JourneyMetrics = Object.freeze({ opened: false, personalCompleted: false, submitted: false, validationAttempts: 0, validationFailures: 0 });
export type JourneyEvent = 'opened' | 'personal_completed' | 'submitted' | 'validation_passed' | 'validation_failed';

// One observed journey per page load. Repeated milestones do not add journeys.
export function recordJourney(state: JourneyMetrics, event: JourneyEvent): JourneyMetrics {
  switch (event) {
    case 'opened': return { ...state, opened: true };
    case 'personal_completed': return { ...state, opened: true, personalCompleted: true };
    case 'submitted': return { ...state, opened: true, personalCompleted: true, submitted: true };
    case 'validation_passed': return { ...state, validationAttempts: state.validationAttempts + 1 };
    case 'validation_failed': return { ...state, validationAttempts: state.validationAttempts + 1, validationFailures: state.validationFailures + 1 };
  }
}
export function journeyRates(state: JourneyMetrics) {
  return {
    completion: state.opened ? (state.submitted ? 100 : 0) : null,
    validationFailure: state.validationAttempts ? Math.round(state.validationFailures / state.validationAttempts * 100) : null,
  };
}
