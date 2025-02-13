import { CgSpinner } from "react-icons/cg";

interface IProps {
  loading: boolean;
  hasMore: boolean;
  i18n: {
    loading: string;
    noMore: string;
  };
}

export default function LoadMoreIndicator(props: IProps) {
  const { loading, hasMore, i18n } = props;

  return (
    <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
      {loading && (
        <div className="flex items-center justify-center gap-2">
          <CgSpinner className="h-5 w-5 animate-spin text-primary" />
          {i18n.loading}
        </div>
      )}
      {!hasMore && <div> {i18n.noMore}</div>}
    </div>
  );
}