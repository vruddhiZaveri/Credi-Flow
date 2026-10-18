import type { LoanForm } from '../types/loan.js';

export const draftKey = 'crediflow:draft:v1';
type StoragePort = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export type DraftResult = { ok: true; form?: LoanForm } | { ok: false; message: string };
const fields = ['name', 'email', 'phone', 'income', 'employment', 'existingEmi', 'requested', 'tenure'] as const;

// Storage is resolved inside try/catch: browsers can deny access entirely.
export function saveDraft(form: LoanForm, storage: () => StoragePort = () => window.localStorage): DraftResult {
  try {
    const data = Object.fromEntries(fields.map(key => [key, form[key]]));
    storage().setItem(draftKey, JSON.stringify({ version: 1, form: data }));
    return { ok: true };
  } catch { return { ok: false, message: 'Draft could not be saved. Keep this page open and try again.' }; }
}

export function loadDraft(storage: () => StoragePort = () => window.localStorage): DraftResult {
  try {
    const raw = storage().getItem(draftKey);
    if (raw === null) return { ok: false, message: 'No saved draft was found in this browser.' };
    const data = JSON.parse(raw);
    if (!data || data.version !== 1 || !data.form ||
        !fields.every(key => typeof data.form[key] === 'string' && data.form[key].length <= 1000)) {
      return { ok: false, message: 'The saved draft is incompatible or damaged. Delete it and save a new draft.' };
    }
    // Select known fields only. A saved draft is incomplete input, not a valid submission.
    const form = Object.fromEntries(fields.map(key => [key, data.form[key]])) as Omit<LoanForm, 'consent'>;
    return { ok: true, form: { ...form, consent: false } };
  } catch { return { ok: false, message: 'Draft could not be read. Browser storage may be unavailable or damaged.' }; }
}

export function deleteDraft(storage: () => StoragePort = () => window.localStorage): DraftResult {
  try { storage().removeItem(draftKey); return { ok: true }; }
  catch { return { ok: false, message: 'Saved draft could not be deleted. Please try again.' }; }
}
