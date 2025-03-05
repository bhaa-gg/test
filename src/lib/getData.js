// lib/getData.ts
import { cache } from "react";

export const getData = cache(async () => {
    return { message: "!" };
});
