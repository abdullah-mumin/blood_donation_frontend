import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};
type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  //   onSubmit: (data: FieldValues) => Promise<boolean>;
} & TFormConfig;

const BHForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = async (data) => {
    const success = await onSubmit(data);
    if (success) {
      reset();
    }
    // console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default BHForm;
