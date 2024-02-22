import { FormattedMessage, useIntl } from "@/components/Common/Intl/Intl";
import cssClasses from "./LoadingOverlay.module.css";

export interface ILoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay(props: ILoadingOverlayProps) {
  const intl = useIntl();

  if (props.isLoading) {
    return (
      <div className={cssClasses["loading-screen"]}>
        <div>
          <div className={cssClasses["loading-image-div"]}>
            <svg
              fill="currentColor"
              role="img"
              aria-label={intl.formatMessage({ id: "txt.loading" })}
            >
              <use xlinkHref="bootstrap-icons-custom.svg#calendar-event" />
            </svg>
            <div className={cssClasses["spinner-border"]} role="status">
              <span className="sr-only">
                <FormattedMessage id="txt.loading" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <></>;
}
