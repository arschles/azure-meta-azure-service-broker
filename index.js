'use strict';

var broker = require('./brokerserver');

broker.start();
broker.db.updateSQLcredentials(broker.opts.accountPool.sqldb);