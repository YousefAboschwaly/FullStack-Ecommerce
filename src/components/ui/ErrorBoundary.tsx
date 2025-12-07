import { Component } from 'react';
import type { ReactNode } from 'react';
import ErrorHandler from './ErrorHandler';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorHandler 
          error={this.state.error} 
          onRetry={this.handleRetry}
          title="Application Error"
          description="Something went wrong in the application. Please try again."
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
