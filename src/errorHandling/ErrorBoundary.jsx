import React, { Component } from 'react';

class ErrorBoundary extends Component {
  // State to track if an error has occurred and store the error details
  state = { hasError: false, error: null };

  // Lifecycle method to update state when an error is caught
  static getDerivedStateFromError(error) {
    return { hasError: true, error }; // Set error state
  }

  render() {
    // Render fallback UI if an error has occurred
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2> {/* Fallback heading */}
          <p>{this.state.error?.message}</p> {/* Display error message */}
        </div>
      );
    }

    // Render child components if no error has occurred
    return this.props.children;
  }
}

export default ErrorBoundary;