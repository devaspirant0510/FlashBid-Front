import { setupWorker } from 'msw/browser';
import { handlers } from '@app/mocks/handlers.ts';

export const worker = setupWorker(...handlers);
