export interface FormData {
  title: string;
  content: string;
}

export interface WriteFormProps {
  defaultValues?: FormData;
  onSubmit: (data: FormData) => void;
  isEditMode: boolean;
  isPending: boolean;
  onBack: () => void;
}
