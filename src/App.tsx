import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Sun, Moon, Lock, Zap, Eye, Headphones, Menu, Quote, Sparkle, MessageCircle, DollarSign, TrendingUp, Coins, Banknote, Landmark, Bitcoin, JapaneseYen, IndianRupee } from 'lucide-react';

// Define type for formErrors
interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  licenseType?: string;
  message?: string;
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [barData, setBarData] = useState<number[]>([]);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Generate random bar data on mount
  useEffect(() => {
    const generateRandomData = () => {
      const data = Array.from({ length: 6 }, () => Math.floor(Math.random() * 11) + 5); // Random values 5–15
      setBarData(data);
    };
    generateRandomData();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);

    // Mock AI responses
    let response = '';
    const inputLower = chatInput.toLowerCase();
    if (inputLower.includes('hello') || inputLower.includes('hi')) {
      response = 'Hello! Welcome to SoftSell’s AI Assistant. How can I help you sell your licenses?';
    } else if (inputLower.includes('valuation') || inputLower.includes('value')) {
      response = 'I can assist with a valuation! Please provide your license details in the Contact Form below.';
    } else {
      response = 'I’m here to help! Try asking about license valuation or contact our support team.';
    }

    // Add AI response
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: 'ai', text: response }]);
    }, 500);

    setChatInput('');
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.company.trim()) errors.company = 'Company is required';
    if (!formData.licenseType) errors.licenseType = 'License Type is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', company: '', licenseType: '', message: '' });
  };

  // Bar chart labels
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const yAxisLabels = [0, 5, 10, 15];

  // Floating icon animation variants
  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
        rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
      },
    },
  };

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-green-50 text-gray-900'
          }`}
      >
        {/* Navigation Bar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm py-4 px-4`}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <a
              className={`flex text-2xl gap-2 font-semibold items-center justify-center ${darkMode ? 'text-white' : 'text-gray-900'
                }`}
              href='#hero'
            >
              <Sparkle />
              SoftShell
            </a>

            {/* Desktop Navbar Links */}
            <div
              className={`hidden md:flex space-x-6 rounded-lg px-8 py-4 text-xl ${darkMode ? 'bg-gray-800' : 'bg-[#e9fff0]'
                }`}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${darkMode ? 'text-green-300 hover:text-green-400' : 'text-green-600 hover:text-green-500'
                    }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="icon"
              className={`md:hidden rounded-full backdrop-blur-sm transition-all duration-300 ${darkMode
                ? 'bg-gray-900/50 hover:shadow-green-500'
                : 'bg-white/50 hover:shadow-green-300'
                }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Dark Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full backdrop-blur-sm shadow-md transition-all duration-300 ${darkMode
                  ? 'bg-gray-900/50 hover:shadow-green-500'
                  : 'bg-white/50 hover:shadow-green-300'
                  }`}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block py-2 text-sm font-medium transition-colors duration-300 ${darkMode ? 'text-green-300 hover:text-green-400' : 'text-green-600 hover:text-green-500'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button
                variant="outline"
                size="icon"
                className={`mt-4 rounded-full backdrop-blur-sm transition-all duration-300 ${darkMode
                  ? 'bg-gray-900/50 hover:shadow-green-500'
                  : 'bg-white/50 hover:shadow-green-300'
                  }`}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </motion.div>
          )}
        </motion.nav>

        {/* Hero Section with AI Chat Widget, Bar Chart, and Floating Icons */}
        <section
          id="hero"
          className={`relative text-center overflow-x-hidden bg-gradient-to-r py-24 md:py-32 ${darkMode
            ? 'from-green-900 via-green-800 to-teal-800 text-white'
            : 'from-green-600 via-green-500 to-teal-500 text-gray-900'
            }`}
        >
          <div
            className={`absolute inset-0 pointer-events-none opacity-20 ${darkMode ? 'bg-grid-dark' : 'bg-grid-light'
              }`}
          />
          {/* Floating Icons */}
          <motion.div
            variants={floatVariants}
            animate="animate"
            className={`absolute top-80 left-80 ${darkMode ? 'text-green-200 ' : 'text-green-100'}`}
          >
            <DollarSign className="h-8 w-8 drop-shadow-xl drop-shadow-green-500 max-lg:opacity-60 max-md:opacity-40 max-sm:opacity-5" />
          </motion.div>
          <motion.div
            variants={floatVariants}
            animate="animate"
            className={`absolute top-40 right-60 ${darkMode ? 'text-green-200' : 'text-green-100'}`}
          >
            <TrendingUp className="h-8 w-8 drop-shadow-xl drop-shadow-green-500 max-lg:opacity-60 max-md:opacity-40 max-sm:opacity-5" />
          </motion.div>
          <motion.div
            variants={floatVariants}
            animate="animate"
            className={`absolute top-40 left-50 ${darkMode ? 'text-green-200' : 'text-green-100'}`}
          >
            <Coins className="h-8 w-8 drop-shadow-xl drop-shadow-green-500 max-lg:opacity-60 max-md:opacity-40 max-sm:opacity-5" />
          </motion.div>
          <motion.div
            variants={floatVariants}
            animate="animate"
            className={`absolute top-90 right-80 ${darkMode ? 'text-green-200' : 'text-green-100'}`}
          >
            <Banknote className="h-8 w-8 drop-shadow-xl drop-shadow-green-500 max-lg:opacity-60 max-md:opacity-40 max-sm:opacity-5" />
          </motion.div>

          <motion.div
            variants={floatVariants}
            animate="animate"
            className={`absolute top-70 right-30 ${darkMode ? 'text-green-200' : 'text-green-100'}`}
          >
            <Landmark className="h-8 w-8 drop-shadow-xl drop-shadow-green-500 max-lg:opacity-60 max-md:opacity-40 max-sm:opacity-5" />
          </motion.div>

          <motion.div
            variants={floatVariants}
            animate="animate"
            className={`absolute top-70 left-30 ${darkMode ? 'text-green-200' : 'text-green-100'}`}
          >
            <Bitcoin className="h-8 w-8 drop-shadow-xl drop-shadow-green-500 max-lg:opacity-60 max-md:opacity-40 max-sm:opacity-5" />
          </motion.div>

          <motion.div
            variants={floatVariants}
            animate="animate"
            className={`absolute top-105 left-45 ${darkMode ? 'text-green-200' : 'text-green-100'}`}
          >
            <JapaneseYen className="h-8 w-8 drop-shadow-xl drop-shadow-green-500 max-lg:opacity-60 max-md:opacity-40 max-sm:opacity-5" />
          </motion.div>

          <motion.div
            variants={floatVariants}
            animate="animate"
            className={`absolute top-105 right-45 ${darkMode ? 'text-green-200' : 'text-green-100'}`}
          >
            <IndianRupee className="h-8 w-8 drop-shadow-xl drop-shadow-green-500 max-lg:opacity-60 max-md:opacity-40 max-sm:opacity-5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-4 pt-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Unlock the Future with SoftSell
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            >
              Sell your unused software licenses seamlessly and securely in a
              cutting-edge marketplace.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-2 justify-center items-center flex-wrap"
            >
              <Button
                asChild
                size="lg"
                className={`transition-all duration-300 hover:shadow-lg border-2 ${darkMode
                  ? 'bg-gray-800 text-green-300 border-green-400 hover:bg-gray-700 hover:shadow-green-500'
                  : 'bg-white text-green-600 border-green-500 hover:bg-gray-100 hover:shadow-green-300'
                  }`}
              >
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button
                asChild
                size="lg"
                className={`transition-all duration-300 hover:shadow-lg border-2 flex gap-1 ${darkMode
                  ? 'bg-gray-800 text-green-300 border-green-400 hover:bg-gray-700 hover:shadow-green-500'
                  : 'bg-white text-green-600 border-green-500 hover:bg-gray-100 hover:shadow-green-300'
                  }`}
              >
                <a href="https://github.com/SahilSharma1212" target='blank'>View Github</a>
              </Button>
            </motion.div>
            {/* Custom Bar Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`mt-12 p-6 rounded-lg shadow-lg max-w-3xl mx-auto ${darkMode ? 'bg-gray-800/80 shadow-green-500' : 'bg-white/80 shadow-green-700'
                } backdrop-blur-sm shadow-lg`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                License Sales Value ($1000s)
              </h3>
              <div className="relative flex items-end h-64">
                {/* Y-Axis Labels */}
                <div className="flex flex-col justify-between h-full pr-4">
                  {yAxisLabels.map((label, index) => (
                    <span
                      key={index}
                      className={`text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
                    >
                      ${label}k
                    </span>
                  ))}
                </div>

                {/* Bars and X-Axis Labels */}
                <div className="flex-1 flex items-end justify-between">
                  {barData.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${value * 15}px` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`w-10 max-md:w-8 max-sm:w-6 rounded-t-md ${darkMode ? 'bg-green-300' : 'bg-green-600'}`}
                      />
                      <span
                        className={`mt-2 text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
                      >
                        {months[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* AI Chat Widget Toggle Button */}
          <motion.div
            initial={{ opacity: 0, scale: 10 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full backdrop-blur-sm shadow-md transition-all duration-300 ${darkMode
                ? 'bg-gray-900/50 hover:shadow-green-500'
                : 'bg-white/50 hover:shadow-green-300'
                }`}
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* AI Chat Widget */}
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`fixed bottom-16 right-4 w-80 rounded-lg shadow-lg p-4 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                }`}
            >
              <div className="h-64 overflow-y-auto mb-4 p-2">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                  >
                    <span
                      className={`inline-block rounded-lg px-3 py-2 ${msg.sender === 'user'
                        ? darkMode
                          ? 'bg-green-700 text-green-200'
                          : 'bg-green-100 text-green-800'
                        : darkMode
                          ? 'bg-gray-700 text-gray-200'
                          : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about license valuation..."
                  className={`resize-none ${darkMode
                    ? 'bg-gray-700 text-gray-100 border-green-500'
                    : 'bg-white text-gray-900 border-green-300'
                    }`}
                  rows={2}
                />
                <Button
                  type="submit"
                  className={`${darkMode
                    ? 'bg-gray-800 text-green-300 hover:bg-gray-700'
                    : 'bg-white text-green-600 hover:bg-gray-100'
                    }`}
                >
                  Send
                </Button>
              </form>
            </motion.div>
          )}
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-green-50'
            }`}
        >
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Upload License', desc: 'Securely submit your license details.', icon: '📤' },
              { title: 'Get Valuation', desc: 'Receive a fair market valuation.', icon: '💸' },
              { title: 'Get Paid', desc: 'Fast and secure payment processing.', icon: '🏦' },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  className={`border-none shadow-lg transition-all duration-300 min-h-[200px] ${darkMode
                    ? 'bg-gray-800 hover:shadow-green-500'
                    : 'bg-white hover:shadow-green-300'
                    }`}
                >
                  <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full">
                    <motion.div
                      className={`text-4xl mb-4 ${darkMode ? 'text-green-300' : 'text-green-600'
                        }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p>{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section
          id="why-us"
          className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-green-50'
            }`}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose SoftSell?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Secure', desc: 'Industry-leading encryption for your data.', icon: <Lock className="h-8 w-8" /> },
              { title: 'Fast', desc: 'Quick valuations and payments.', icon: <Zap className="h-8 w-8" /> },
              { title: 'Transparent', desc: 'No hidden fees, clear pricing.', icon: <Eye className="h-8 w-8" /> },
              { title: 'Support', desc: '24/7 experts and support team.', icon: <Headphones className="h-8 w-8" /> },
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  className={`border-none shadow-lg transition-all duration-300 min-h-[200px] ${darkMode
                    ? 'bg-gray-800 hover:shadow-green-500'
                    : 'bg-white hover:shadow-green-300'
                    }`}
                >
                  <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full">
                    <motion.div
                      className={`mb-4 ${darkMode ? 'text-green-300' : 'text-green-600'
                        }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {reason.icon}
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                    <p>{reason.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <section
          id="testimonials"
          className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-green-50'
            }`}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: 'SoftSell made selling my unused licenses a breeze. Fast, secure, and transparent!',
                name: 'Jane Doe',
                role: 'IT Manager',
                company: 'TechCorp',
              },
              {
                quote: 'The valuation was fair, and I got paid quickly. Highly recommend SoftSell!',
                name: 'John Smith',
                role: 'Software Engineer',
                company: 'Innovate Solutions',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  className={`border-none shadow-lg transition-all duration-300 ${darkMode
                    ? 'bg-gray-800 hover:shadow-green-500'
                    : 'bg-white hover:shadow-green-300'
                    }`}
                >
                  <CardContent className="pt-6">
                    <Quote
                      className={`h-6 w-6 mb-4 ${darkMode ? 'text-green-300' : 'text-green-600'
                        }`}
                    />
                    <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm">{testimonial.role}, {testimonial.company}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact/Lead Form Section */}
        <section
          id="contact"
          className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-green-50'
            }`}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="max-w-5xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleFormSubmit}
              className="space-y-4"
            >
              <div>
                <Input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`${darkMode
                    ? 'bg-gray-700 text-gray-100 border-green-500'
                    : 'bg-white text-gray-900 border-green-300'
                    }`}
                  required
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`${darkMode
                    ? 'bg-gray-700 text-gray-100 border-green-500'
                    : 'bg-white text-gray-900 border-green-300'
                    }`}
                  required
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={`${darkMode
                    ? 'bg-gray-700 text-gray-100 border-green-500'
                    : 'bg-white text-gray-900 border-green-300'
                    }`}
                  required
                />
                {formErrors.company && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>
                )}
              </div>
              <div>
                <Select
                  value={formData.licenseType}
                  onValueChange={(value) => setFormData({ ...formData, licenseType: value })}
                  required
                >
                  <SelectTrigger
                    className={`${darkMode
                      ? 'bg-gray-700 text-gray-100 border-green-500'
                      : 'bg-white text-gray-900 border-green-300'
                      }`}
                  >
                    <SelectValue placeholder="Select License Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perpetual">Perpetual</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.licenseType && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.licenseType}</p>
                )}
              </div>
              <div>
                <Textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${darkMode
                    ? 'bg-gray-700 text-gray-100 border-green-500'
                    : 'bg-white text-gray-900 border-green-300'
                    }`}
                  rows={4}
                  required
                />
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className={`w-full transition-all duration-300 hover:shadow-lg ${darkMode
                  ? 'bg-gray-800 text-green-300 hover:bg-gray-700 hover:shadow-green-500'
                  : 'bg-white text-green-600 hover:bg-gray-100 hover:shadow-green-300'
                  }`}
              >
                Submit
              </Button>
            </motion.form>
          </div>
        </section>
      </div>
      <footer className="w-full border-t border-muted py-6 text-center text-sm text-muted-foreground dark:border-gray-700 dark:text-gray-400 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <a href="https://mail.google.com/mail/?view=cm&to=sahilbhaisharma1212@gmail.com" target="_blank" className="hover:underline">
            Send Email
          </a>
          <a href="https://github.com/SahilSharma1212" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/sahil-sharma-822a752a9/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            LinkedIn
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;