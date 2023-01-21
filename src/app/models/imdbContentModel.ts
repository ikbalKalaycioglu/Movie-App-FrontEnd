import { Result } from "./imdbContent";

export interface ImdbContent<T> {
    page:          number;
    results:       T[];
    total_pages:   number;
    total_results: number;
}
