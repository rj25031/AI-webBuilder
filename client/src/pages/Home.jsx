import React, { useRef, useState } from "react";

import Layout from "../components/Layout";

export default function Home() {
  const [logo, setLogo] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [gst, setGst] = useState("");
  const [year, setYear] = useState("");
  const [employees, setEmployees] = useState("");
  const [legalStatus, setLegalStatus] = useState("Sole Proprietorship");
  const [turnover, setTurnover] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [showSEO, setShowSEO] = useState(false);

  const [aiEnabled, setAiEnabled] = useState(false);
  const [templateCat, setTemplateCat] = useState("");
  const [layoutStyle, setLayoutStyle] = useState("Modern");
  const [contentTone, setContentTone] = useState("Professional");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#10b981");
  const [typography, setTypography] = useState("Sans-serif");
  const [primaryCTA, setPrimaryCTA] = useState("Contact Us");
  const [targetAudience, setTargetAudience] = useState("");
  const [desiredSections, setDesiredSections] = useState([]);
  const [aiPreview, setAiPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const onLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleTagInput = (e, input, setInput, list, setList) => {
    if (e.key === "Enter" && input.trim() && list.length < 10) {
      e.preventDefault();
      setList([...list, input.trim()]);
      setInput("");
    }
  };
  const removeTag = (idx, list, setList) =>
    setList(list.filter((_, i) => i !== idx));

  const handleSectionChange = (section) => {
    setDesiredSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleGenerateAI = async () => {
    const aiConfig = {
      templateCat,
      layoutStyle,
      contentTone,
      primaryColor,
      secondaryColor,
      typography,
      primaryCTA,
      targetAudience,
      desiredSections,
    };
    const payload = {
      businessName,
      description,
      category,
      year,
      legalStatus,
      ...aiConfig,
    };
    setLoading(true);
    const res = await fetch("http://localhost:3005/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const html = await res.text();
    setAiPreview(html);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      businessName,
      description,
      category,
      gst,
      year,
      employees,
      legalStatus,
      turnover,
      keywords,
      ai: aiEnabled
        ? {
            templateCat,
            layoutStyle,
            contentTone,
            primaryColor,
            secondaryColor,
            typography,
            primaryCTA,
            targetAudience,
            desiredSections,
          }
        : null,
    };
    console.log("submit payload:", payload);
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto p-6 my-10 bg-white shadow rounded-lg space-y-8"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="h-48 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
              {logo ? (
                <img
                  src={logo}
                  alt="Logo preview"
                  className="h-full object-contain"
                />
              ) : (
                <span className="text-gray-400">Logo</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Upload
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={onLogoChange}
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder="Business"
                className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Business Description"
                className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select…</option>
                  <option>LOCAL BUSINESS</option>
                  <option>ONLINE BUSINESS</option>
                  <option>MANUFACTURING</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GST No
                </label>
                <input
                  type="text"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                  placeholder="GST Number Ex. FRTG677HGJJI"
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year of Establishment
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Year of Establishment Ex. 2019"
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Number of Employees
                </label>
                <input
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  placeholder="Total Number of Employees Ex. 1500"
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Legal Status
                </label>
                <select
                  value={legalStatus}
                  onChange={(e) => setLegalStatus(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Sole Proprietorship</option>
                  <option>Partnership</option>
                  <option>LLP</option>
                  <option>Pvt. Ltd.</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Annual Turnover
                </label>
                <input
                  type="text"
                  value={turnover}
                  onChange={(e) => setTurnover(e.target.value)}
                  placeholder="Annual Turnover Ex. 10 Crore"
                  className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meta Keywords{" "}
                <span className="text-gray-400">({keywords.length}/10)</span>
              </label>
              <div className="mt-1 flex flex-wrap gap-2 border border-gray-300 rounded p-2">
                {keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                  >
                    {kw}
                    <button
                      onClick={() => removeTag(i, keywords, setKeywords)}
                      className="ml-1 text-blue-600 hover:text-blue-900"
                      type="button"
                    >
                      &times;
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) =>
                    handleTagInput(
                      e,
                      keywordInput,
                      setKeywordInput,
                      keywords,
                      setKeywords
                    )
                  }
                  disabled={keywords.length >= 10}
                  placeholder="Type keyword and press Enter"
                  className="flex-1 min-w-[120px] outline-none py-1"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">
                  AI-Driven Suggestions
                </h3>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiEnabled}
                    onChange={() => setAiEnabled(!aiEnabled)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">Enable AI</span>
                </label>
              </div>

              {aiEnabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Template Category
                    </label>
                    <select
                      value={templateCat}
                      onChange={(e) => setTemplateCat(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a category…</option>
                      <option>Business</option>
                      <option>Portfolio</option>
                      <option>E-commerce</option>
                      <option>Blog</option>
                      <option>Landing Page</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Preferred Layout Style
                    </p>
                    <div className="flex space-x-4">
                      {["Minimal", "Modern", "Classic", "Bold"].map((s) => (
                        <label key={s} className="inline-flex items-center">
                          <input
                            type="radio"
                            name="layoutStyle"
                            value={s}
                            checked={layoutStyle === s}
                            onChange={() => setLayoutStyle(s)}
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-gray-700">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Content Tone
                    </label>
                    <select
                      value={contentTone}
                      onChange={(e) => setContentTone(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Professional</option>
                      <option>Casual</option>
                      <option>Friendly</option>
                      <option>Authoritative</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Primary Color
                      </label>
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="mt-1 h-10 w-10 rounded border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Secondary Color
                      </label>
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="mt-1 h-10 w-10 rounded border border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Typography Preference
                    </label>
                    <select
                      value={typography}
                      onChange={(e) => setTypography(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Sans-serif</option>
                      <option>Serif</option>
                      <option>Display</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Primary Call-To-Action
                    </label>
                    <input
                      type="text"
                      value={primaryCTA}
                      onChange={(e) => setPrimaryCTA(e.target.value)}
                      placeholder="Contact Us"
                      className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Target Audience
                    </label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select…</option>
                      <option>Startups</option>
                      <option>Photographers</option>
                      <option>Restaurants</option>
                      <option>Consultants</option>
                      <option>E-commerce Sellers</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Desired Sections
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        "Features",
                        "Testimonials",
                        "Pricing",
                        "Team",
                        "Contact",
                      ].map((sec) => (
                        <label key={sec} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={desiredSections.includes(sec)}
                            onChange={() => handleSectionChange(sec)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-gray-700">{sec}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleGenerateAI}
                      className={`text-white py-2 px-4 rounded ${
                        loading ? "bg-gray-500 hover:bg-gray-700 " : "bg-green-600 hover:bg-green-700 "
                      }`}
                      disabled={loading}
                    >
                     { loading ? "loading" :" Generate AI Preview"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={() => setShowSEO(!showSEO)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                <svg
                  className={`w-4 h-4 mr-2 transform transition-transform ${
                    showSEO ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Advanced SEO Settings
              </button>
              {showSEO && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter SEO Title for home page"
                      className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Meta Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter SEO Description for home page"
                      className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
              >
                Save Business Information
              </button>
            </div>
          </div>
        </div>
      </form>

      {aiPreview && (
        <div className="mt-10 p-4 bg-gray-50 border">
          <h2 className="text-lg font-semibold mb-4">AI-Generated Preview</h2>
          <div dangerouslySetInnerHTML={{ __html: aiPreview }} />
        </div>
      )}
    </Layout>
  );
}
