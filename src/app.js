
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/error.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

app.get('/', (_req, res) => res.json({ ok: true, service: 'kitchen-kettles-api' }));
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;

