"use client";

import React from "react";

interface SceneErrorBoundaryProps {
  children: React.ReactNode;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

export class SceneErrorBoundary extends React.Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  constructor(props: SceneErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#050505] px-6 text-center">
          <p className="font-display text-sm tracking-[0.2em] uppercase text-white/80 mb-3">
            3D view unavailable
          </p>
          <p className="font-body text-xs text-white/45 max-w-sm leading-relaxed mb-6">
            WebGL may be disabled, or the model could not load. You can still read the chapters
            below—use Home and the chapter tabs when story mode is open.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="font-body text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.06] text-white/80 hover:bg-white/[0.1] transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
