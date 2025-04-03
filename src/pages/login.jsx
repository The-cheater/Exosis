import { useState } from 'react'

const Signinl = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-800 mb-2">Hogwarts</h1>
          <p className="text-gray-600">Magical Gateway</p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-6 space-y-4 border border-gray-200 shadow-sm"
        >
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Owl Post Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-50 rounded-md text-gray-800 focus:ring-1 focus:ring-amber-500 focus:outline-none border border-gray-300"
              placeholder="wizard@hogwarts.edu"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Secret Spell
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-50 rounded-md text-gray-800 focus:ring-1 focus:ring-amber-500 focus:outline-none border border-gray-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
          >
            {isSubmitting ? 'Verifying...' : 'Alohomora'}
          </button>

          <p className="text-center text-sm text-gray-600 pt-4">
            First year?{' '}
            <a href="/signup" className="text-amber-600 hover:text-amber-700">
              Enroll at Hogwarts
            </a>
          </p>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Protected by the Fidelius Charm
        </p>
      </div>
    </div>
  )
}

export default Signinl