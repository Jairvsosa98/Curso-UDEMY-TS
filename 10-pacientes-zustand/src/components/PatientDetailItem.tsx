type PatientDetailItemProps = {
  label: string;
  data: string;
};

export default function ({ label, data }: PatientDetailItemProps) {
  return (
    <p className="font-bold mb-3 text-gray-3700 uppercase">
      {label}: {""}
      <span className="font-normal normal-case">{data}</span>
    </p>
  );
}
