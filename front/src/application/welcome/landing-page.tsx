import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const LandingPage = () => {

  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/chat");
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 to-gray-100 text-gray-800">
        <main className="flex-1 px-4 py-8 max-w-3xl mx-auto w-full">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">Welcome to Your Messaging Platform</h2>
            <p className="text-gray-700">
              Experience the power of Apache Kafka for real-time messaging and notifications.<br />
              Our platform enables decoupled, reliable communication between users and services.
            </p>
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
            <p className="mb-4 text-gray-700">
              Ready to start messaging? Choose your preferred interaction method and begin
              experiencing the benefits of Kafka-powered communication.
            </p>
            <div className="flex gap-4">
              <Button onClick={goToChat}>
                Start Messaging
              </Button>
              <Button variant="secondary">View Documentation</Button>
            </div>
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Platform Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex flex-col items-start">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg font-bold"><span className="text-3xl">💬</span>Simple Message Exchange</CardTitle>
                  <CardDescription>Send and receive messages through Kafka topics with reliable delivery. Supports both one-to-one and one-to-many messaging patterns.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-gray-500">
                    <li>Asynchronous communication</li>
                    <li>Decoupled sender/receiver logic</li>
                    <li>Real-time or on-demand message consumption</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-start">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg font-bold"><span className="text-3xl">🔔</span>Notification Delivery</CardTitle>
                  <CardDescription>Scalable notification system for alerts and updates using Kafka's reliable event streaming capabilities.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-gray-500">
                    <li>Guaranteed notification delivery</li>
                    <li>Scalable distribution</li>
                    <li>Real-time processing</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Available Kafka Topics</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-blue-50 rounded px-4 py-2">
                <span className="font-mono font-bold text-blue-700">messages</span>
                <span className="text-gray-600">General message exchange</span>
              </div>
              <div className="flex items-center gap-4 bg-blue-50 rounded px-4 py-2">
                <span className="font-mono font-bold text-blue-700">notifications</span>
                <span className="text-gray-600">System notifications and alerts</span>
              </div>
            </div>
          </section>


        </main>

        <footer className="py-6 text-center bg-white border-t mt-auto">
          <p className="text-gray-500">Powered by Apache Kafka • Built for Scale • Designed for Reliability</p>
        </footer>
      </div>
    </>
  )
}