"use client";

import { Component, type ReactNode } from "react";

interface State { hasError: boolean; message: string }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-error text-body font-heading">Something went wrong</p>
          <p className="text-text-muted text-body-sm">{this.state.message}</p>
          <button onClick={() => this.setState({ hasError: false, message: "" })} className="px-4 py-2 bg-accent text-white rounded-full text-body-sm">
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
