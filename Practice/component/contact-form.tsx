'use client'

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react' 

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
    <section className="relative overflow-hidden bg-slate-50/50 py-24 px-6 sm:px-10 lg:px-16">
      {/* Decorative background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-down">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#C9A227] font-semibold">
            Get In Touch
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            We&apos;d Love to Hear From You
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Have questions about a listing, need assistance with leasing, or want to partner up? Drop us a message below.
          </p>
        </div>

        {/* Main Grid: Info Cards on Left, Modern Glass Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact Info Cards (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6" data-aos="fade-right">
            
            {/* Info Container Box */}
            <div className="bg-[#12202B] text-white p-8 rounded-2xl shadow-xl flex-1 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#C9A227]/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  Contact Information
                </h3>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                  Fill out the form or reach out directly through our channels. We reply within 24 hours.
                </p>

                <div className="mt-8 space-y-6">
                  {/* Phone */}
                  <div className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C9A227] shrink-0 group-hover:bg-[#C9A227] group-hover:text-[#12202B] transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Phone Number</p>
                      <p className="mt-1 text-sm font-medium text-white">+977 9821005569</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C9A227] shrink-0 group-hover:bg-[#C9A227] group-hover:text-[#12202B] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Email Address</p>
                      <p className="mt-1 text-sm font-medium text-white">support@yoursite.com</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C9A227] shrink-0 group-hover:bg-[#C9A227] group-hover:text-[#12202B] transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Our Location</p>
                      <p className="mt-1 text-sm font-medium text-white">Butwal, Rupandehi, Nepal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours Sub-note */}
              <div className="mt-12 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-400">
                  <span className="text-[#C9A227] font-semibold">Open Hours:</span> Sun - Fri: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Modern Form Card (8 Cols) */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100 relative" data-aos="fade-left">
            
            {status === 'success' ? (
              <div className="py-16 text-center space-y-4" data-aos="zoom-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out. We have received your inquiry and will get back to you within a day.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleResetStatus}
                    className="inline-flex items-center justify-center rounded-xl bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-600 font-semibold">
                      Your Name <span className="text-amber-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...register('name', { required: 'Name is required' })}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                    />
                    {errors.name && (
                      <span className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-600 font-semibold">
                      Email Address <span className="text-amber-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                    />
                    {errors.email && (
                      <span className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-gray-600 font-semibold">
                    Subject <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help you?"
                    {...register('subject', { required: 'Subject is required' })}
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                  />
                  {errors.subject && (
                    <span className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.subject.message}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-600 font-semibold">
                    Message <span className="text-amber-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Write your message here..."
                    {...register('message', { required: 'Message is required' })}
                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 text-sm outline-none focus:border-[#C9A227] focus:bg-white focus:ring-2 focus:ring-[#C9A227]/20 transition-all"
                  />
                  {errors.message && (
                    <span className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.message.message}
                    </span>
                  )}
                </div>

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A227] px-8 py-4 text-sm font-semibold text-[#12202B] shadow-md hover:bg-[#e0b62c] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}

export default ContactSection