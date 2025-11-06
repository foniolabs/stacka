"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api/client";
import Button from "@/components/ui/Button";

export default function TestApiPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const testConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiUrl || "http://localhost:4000"}/health`
      );
      const data = await response.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setTestResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">API Configuration Test</h1>
      <div className="card space-y-4">
        <div>
          <p className="text-text-secondary">NEXT_PUBLIC_API_URL:</p>
          <p className="text-primary font-mono text-lg">
            {apiUrl || "http://localhost:4000"}
          </p>
        </div>
        <div>
          <p className="text-text-secondary">Expected (Local Dev):</p>
          <p className="text-accent-green font-mono">http://localhost:4000</p>
        </div>
        <div>
          <p className="text-text-secondary">Auth Token:</p>
          <p className={token ? "text-accent-green" : "text-accent-red"}>
            {token
              ? `✅ Present (${token.substring(0, 20)}...)`
              : "❌ Not logged in"}
          </p>
        </div>

        <div className="border-t border-border pt-4">
          <Button onClick={testConnection} isLoading={isLoading}>
            Test Backend Connection
          </Button>
          {testResult && (
            <pre className="mt-4 p-4 bg-background-card rounded-lg text-sm overflow-auto">
              {testResult}
            </pre>
          )}
        </div>

        <div className="border-t border-border pt-4">
          <h2 className="font-bold mb-2">Troubleshooting:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-text-secondary">
            <li>Make sure backend is running on http://localhost:4000</li>
            <li>
              Test backend health:{" "}
              <code className="text-primary">
                curl http://localhost:4000/health
              </code>
            </li>
            <li>
              Login first at{" "}
              <a href="/login" className="text-primary underline">
                /login
              </a>
            </li>
            <li>Check browser console for detailed errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
