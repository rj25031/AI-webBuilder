# AI Website Builder

AI Website Builder is a modern web application that uses artificial intelligence to generate professional, customized websites based on business information. It provides an intuitive interface for users to input their business details and receive AI-generated website code that can be further customized.

## Features

- **Business Profile Management**: Easy input form for business details including name, description, category, and more
- **AI-Driven Website Generation**: Generate complete website code based on business information
- **Customizable Templates**: Choose from multiple template categories and customize layout styles
- **Design Preferences**: Select color schemes, typography, and content tone
- **Section Selection**: Pick which sections to include in your website (Features, Testimonials, Pricing, etc.)
- **Real-time Preview**: Preview AI-generated websites before finalizing
- **SEO Settings**: Advanced options for optimizing meta tags and keywords

## Tech Stack

### Frontend
- **React 19** - Modern UI library for building interactive interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Next generation frontend build tool
- **React Router** - Declarative routing for React applications

### Backend
- **FastAPI** - Modern, fast Python web framework
- **Uvicorn** - ASGI server for Python applications
- **PyTorch** - Machine learning library
- **LLaMA 3.1 8B** - Large language model for generating website code
- **vLLM** - High-throughput and memory-efficient inference engine

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.9+
- Git

### Installation

#### Client Setup

```bash
# Clone the repository
git clone <repository-url>
cd "AI website builder"

# Install client dependencies
cd client
npm install

# Start development server
npm run dev
```

#### Server Setup

```bash
# Install Python dependencies
pip install fastapi uvicorn pyngrok transformers torch nest_asyncio pymongo sentence-transformers scikit-learn

# Start the server
python server/main.py
```

## Usage

1. **Enter Business Information**:
   - Fill in your business details (name, description, category, etc.)
   - Upload your company logo if available

2. **Enable AI Features**:
   - Toggle the AI-Driven Suggestions option
   - Select template category, layout style, and content tone
   - Choose color scheme and typography preferences
   - Define your target audience
   - Select which sections to include in your website

3. **Generate Website**:
   - Click "Generate AI Preview" to see a preview of your website
   - Make adjustments to your settings as needed

4. **Save or Export**:
   - Save your business information and website design
   - Export the generated HTML code for your website

## Project Structure

