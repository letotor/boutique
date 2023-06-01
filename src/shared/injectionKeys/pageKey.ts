import { Ref } from 'vue';
import { InjectionKey } from 'vue';

export const pageKey = Symbol() as InjectionKey<Ref<number>>;
