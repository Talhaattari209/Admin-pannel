# Implementation Plan - Decouple Pop Cards

The goal is to decouple all pop cards from the generic `BaseCard` component and create specific, reusable components for each distinct type of pop card. This improves maintainability and allows for easier design changes specific to each card type.

## User Review Required
**IMPORTANT**

This refactor involves significant code duplication of the styling currently in `BaseCard` into the new specific components. This is intentional as per the request to "decouple" because "design is difficult to maintain".

I will assume "Title Only" cards are simply the same component with the `description` prop omitted or passed as `null`.

## Proposed Changes

I will create new components in `src/components/pop-cards/` (or strictly follow the existing folder structure if preferred, but grouping them seems cleaner).  
The user explicitly asked to **"Export cards is okay, just make it separate component"**.

### 1. Success Cards
Create two separate reusable components in `src/components/pop-cards/`:

- **`SuccessCard`** (Title + Description)  
  Props: `title`, `description`, `onDone`  
  Icon: Fixed "check circle icon" (no prop)  
  Usage: General success messages with details

- **`SuccessCardTitleOnly`** (Title Only)  
  Props: `title`, `onDone`  
  Icon: Fixed "check circle icon"  
  Usage: Simpler success messages

**Scope**: Include `src/app/login` success card (to be identified) and all other success cards.

### 2. Delete Cards
Create two separate reusable components in `src/components/pop-cards/`:

- **`DeleteCard`** (Title + Description)  
  Props: `title`, `description`, `onCancel`, `onConfirm`, `confirmText`  
  Usage: `RemoveConfirmModal` (Member/Role), `DeletePromptModal`

- **`DeleteCardTitleOnly`** (Title Only)  
  Props: `title`, `onCancel`, `onConfirm`, `confirmText`  
  Usage: Any delete confirmations without descriptions

**Note**: `RemoveMediaCard` and `RemovePromptResponseCard` are complex and will be their own separate components as they contain inputs/reasons, not just simple text.

### 3. Export Card
Refactor `src/components/reported-problem/ExportModal.tsx` to be standalone.

**Changes**:
- Remove `BaseCard` import
- Copy-paste styling
- Ensure it's self-contained

**Rename suggestion**: `ExportPopCard`?

### 4. Prompt Cards
Create `PromptPopCard` in `src/components/app-content/modals/`.

**Props**: `onCancel`, `onSave`, `initialText` (optional for edit), `mode` (`'add' | 'edit'`)  
**Structure**: Standalone styling  
**Usage**: Replace `AddPromptModal` and `EditPromptModal`

### 5. Legal Content Cards
Create `LegalContentPopCard` in `src/components/app-content/legal/modals/`.

**Props**: `onCancel`, `onSave`, `initialTitle`, `initialContent`, `mode` (`'add' | 'edit'`)  
**Structure**: Standalone styling  
**Usage**: Replace `AddContentModal` and `EditContentModal`

**Note**: `ContentDetailsModal` stays as is (but check if it uses `BaseCard` — if so, decouple it too?).  
User said "Content Details pop card will be same as before", which implies no change or minimal change. To strictly follow "decouple **all** pop cards", I will decouple it but keep logic identical.

### 6. FAQ Cards
Create `FAQPopCard` in `src/components/app-content/faq/modals/`.

**Props**: `onCancel`, `onSave`, `initialQuestion`, `initialAnswer`, `mode` (`'add' | 'edit'`)  
**Structure**: Standalone styling  
**Usage**: Replace `AddFAQModal` and `EditFAQModal`

### 7. Deactivate User Card
Refactor `src/components/pop-cards/DeactivationCard.tsx`.

**Changes**:
- Remove `BaseCard` dependency
- Make it standalone

### 8. Team & Roles Cards
Create `RolePopCard` in `src/components/team-roles/modals/`.

**Props**: `onCancel`, `onSave`, `initialRole`, `initialDescription`, `mode` (`'add' | 'edit'`)  
**Structure**: Standalone styling  
**Usage**: Replace `AddRoleModal` and `ChangeRoleModal`

## Verification Plan

### Automated Tests
- None available for UI appearance

### Build Verification
- `npm run build` (or at least check compatibility)

### Manual Verification
- Check file content of new components to ensure they contain necessary styling classes (gradients, borders, backdrop-blur) previously in `BaseCard`
- Verify old files are either deleted or modified to use the new components