# Teresa V1 — Testing Log

**Date:**
**Environment:** HF Spaces
**Tester:** Alexandre

---

## 1. Core Pipeline

| Test | Expected | Result | Notes |
|------|----------|--------|-------|
| Record → transcribe → reply → TTS plays | Full round trip works |v | |
| Second turn (history carries over) | Teresa remembers context | v| |
| Third turn | Still coherent | v|sometimes makes strange sounds or say weird word or sentences but it 's not disruptive |
| 8s hard cap triggers | Recording stops automatically |v | |

---

## 2. Level Switching

| Test | Expected | Result | Notes |
|------|----------|--------|-------|
| Button I (beginner) | Simple vocabulary, max 2 sentences | v| |
| Button II (intermediate) | Normal Italian, max 3 sentences |v | |
| Button III (advanced) | Rich vocabulary, idioms, max 4 sentences |v |says she doesn't speak french |

---

## 3. Persona & Prompt Behavior

| Test | Expected | Result | Notes |
|------|----------|--------|-------|
| Grammar error | Teresa corrects then continues | v| |
| "E tu?" or equivalent | Teresa gives her own answer | v| |
| Out of scope question | Teresa says she doesn't know, asks related question |v |not necessarily out of scope but she redirects |doesn't always correct
| User speaks English/French | Teresa replies in Italian only |v |says she doesn't understand |
| Same question twice | Teresa doesn't repeat it |v |answers but asks something else |change topic when it gets complex

---

## 4. State Machine (Visual)

| Test | Expected | Result | Notes |
|------|----------|--------|-------|
| Click level button | Mic button appears | v| |
| Click mic button | Recording dot appears (dark red) |v | |
| Recording stops | Thinking wave starts |v | |
| TTS starts playing | Random bar animation starts | v| |
| TTS ends | Bars reset to pyramid shape |v | |

---

## 5. Edge Cases

| Test | Expected | Result | Notes |
|------|----------|--------|-------|
| Very short recording (1 word) | Handles gracefully | | says you use tu in italian and asks how I am|
| Background noise only | Handles gracefully |v | |
| Rapid double click on mic | No crash or duplicate recording | |says there might be a problem with the server |

---

## Summary

**Passed:**
**Failed:**
**Deferred to V2:**
