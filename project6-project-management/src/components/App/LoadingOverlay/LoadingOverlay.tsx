import { FormattedMessage, useIntl } from "@/components/Common/Intl/Intl";

export interface ILoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay(props: ILoadingOverlayProps) {
  const intl = useIntl();

  if (props.isLoading) {
    return (
      <div className="h-dvh w-screen flex items-center justify-center fixed top-0 left-0 z-50 bg-transparent/50">
        <div>
          <div className="relative bg-white flex flex-col items-center justify-center p-7 rounded-2xl gap-6">
            <svg fill="currentColor" role="img" aria-label={intl.formatMessage({ id: "txt.loading" })}>
              <use xlinkHref="bootstrap-icons-custom.svg#calendar-event" />
            </svg>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">
                <FormattedMessage id="txt.loading" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else return <></>;
}
