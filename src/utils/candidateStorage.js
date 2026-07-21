import { mockCandidates } from "../data/mockCandidates";

const STORAGE_KEY = "talent_management_candidates";

export const getCandidatesFromStorage = () => {
  const storedCandidates = localStorage.getItem(STORAGE_KEY);

  if (storedCandidates) {
    try {
      return JSON.parse(storedCandidates);
    } catch (error) {
      console.error("Error parsing candidates from localStorage:", error);
      return [];
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCandidates));
  return mockCandidates;
};

export const saveCandidatesToStorage = (candidates) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

export const getCandidateById = (id) => {
  const candidates = getCandidatesFromStorage();
  return candidates.find((candidate) => String(candidate.id) === String(id));
};

export const addCandidateToStorage = (candidate) => {
  const candidates = getCandidatesFromStorage();
  const updatedCandidates = [candidate, ...candidates];
  saveCandidatesToStorage(updatedCandidates);
  return updatedCandidates;
};

export const updateCandidateInStorage = (updatedCandidate) => {
  const candidates = getCandidatesFromStorage();

  const updatedCandidates = candidates.map((candidate) =>
    String(candidate.id) === String(updatedCandidate.id)
      ? updatedCandidate
      : candidate
  );

  saveCandidatesToStorage(updatedCandidates);
  return updatedCandidates;
};

export const deleteCandidateFromStorage = (id) => {
  const candidates = getCandidatesFromStorage();
  const updatedCandidates = candidates.filter(
    (candidate) => String(candidate.id) !== String(id)
  );
  saveCandidatesToStorage(updatedCandidates);
  return updatedCandidates;
};