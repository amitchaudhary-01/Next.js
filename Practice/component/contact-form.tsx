'use client'

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Phone, Mail, MapPin } from 'lucide-react' 

type Inputs = {
  name: string
  email: string
  subject: string
  message: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const ContactSection = () => {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Something went wrong sending your message.')

      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const handleResetStatus = (): void => {
    setStatus('idle')
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Main Grid: Form on Left, Info Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Form & Heading */}
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Get In Touch</h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>

            {status === 'success' ? (
              <div 
                className="mt-8 rounded-xl border border-orange-500/30 bg-orange-50/50 p-6 shadow-sm"
                data-aos="fade-up"
              >
                <p className="text-xs uppercase tracking-widest text-orange-600 font-semibold">Message sent</p>
                <p className="mt-2 text-lg font-medium text-gray-900">
                  Thanks — we&apos;ll get back to you within a day.
                </p>
                <button
                  type="button"
                  onClick={handleResetStatus}
                  className="mt-4 text-sm text-gray-600 underline decoration-orange-500 underline-offset-4 hover:text-gray-900"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Name..."
                    {...register('name', { required: 'Name is required' })}
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 text-sm outline-none focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  {errors.name && (
                    <span className="mt-1 block text-xs text-red-600">{errors.name.message}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="example@youremail.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 text-sm outline-none focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  {errors.email && (
                    <span className="mt-1 block text-xs text-red-600">{errors.email.message}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Topic..."
                    {...register('subject', { required: 'Subject is required' })}
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 text-sm outline-none focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  {errors.subject && (
                    <span className="mt-1 block text-xs text-red-600">{errors.subject.message}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Type message..."
                    {...register('message', { required: 'Message is required' })}
                    className="mt-2 w-full resize-none rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 text-sm outline-none focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  {errors.message && (
                    <span className="mt-1 block text-xs text-red-600">{errors.message.message}</span>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto rounded-lg bg-orange-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Now'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Info Cards Container matching the layout image */}
          <div className="space-y-6" data-aos="fade-left">
            
            {/* Phone Card */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-6 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Phone Number</h3>
              <p className="mt-1 text-sm text-gray-600">+977 9821005569</p>
            </div>

            {/* Email Card */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-6 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Email Address</h3>
              <p className="mt-1 text-sm text-gray-600">support@yoursite.com</p>
            </div>

            {/* Location Card */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-6 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Our Location</h3>
              <p className="mt-1 text-sm text-gray-600">Butwal, Rupandehi, Nepal</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default ContactSection