type ContactSuccessPageProps = {
  searchParams: {
    name: string | undefined;
    email: string | undefined;
  };
};

export default function ContactSuccessPage({ searchParams }: ContactSuccessPageProps): JSX.Element {
  if (!searchParams.name || !searchParams.email) {
    return <p>잘못된 접근입니다.</p>;
  }

  return (
    <div>
      <p>{`${searchParams.name}님, 지원 감사합니다. ${searchParams.email}로 지원 결과를 전달 드리겠습니다.`}</p>
    </div>
  );
}
