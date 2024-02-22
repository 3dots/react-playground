import type { ErrorInfo, PropsWithChildren } from "react";
import React from "react";

interface ErrorBoundaryProps {
  onError: (error: Error, errorInfo: ErrorInfo) => void;
}

export class ErrorBoundary extends React.Component<
  PropsWithChildren<ErrorBoundaryProps>
> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}
