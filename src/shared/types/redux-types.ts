//! Я знаю что по ирархии fsd это не правильно но, правильного способа я не нашел
import type { store } from "@/app/providers/store";

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
