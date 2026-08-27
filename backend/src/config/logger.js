function logLine(level, message, meta = {}) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  }));
}

const logger = {
  info: (message, meta) => logLine('info', message, meta),
  error: (message, meta) => logLine('error', message, meta),
};

module.exports = logger;