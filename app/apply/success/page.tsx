interface ApplySuccessPageProps {
  searchParams: {
    name: string | undefined;
  };
}

export default function ApplySuccessPage({
  searchParams,
}: ApplySuccessPageProps) {
  if (!searchParams.name) {
    return (
      <div>
        <p className="text-red-500">잘못된 접근입니다.</p>
      </div>
    );
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">지원이 완료되었습니다.</h1>
        <p className="mt-5">지원해주셔서 감사합니다, {searchParams.name}님</p>
      </div>
    </main>
  );
}
