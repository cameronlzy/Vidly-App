import * as Sentry from "@sentry/react"
const init = () => {
    return Sentry.init({
        dsn: "https://d3076a7df31cbd782c07db085a42dfbc@o1333667.ingest.sentry.io/4506052713447424",
        integrations: [
          new Sentry.BrowserTracing({
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
          }),
          new Sentry.Replay(),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, // Capture 100% of the transactions
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
      });
}

const log = (error) => {
    return Sentry.captureException(error)
}

export default {
    log,
    init
}