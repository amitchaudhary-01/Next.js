'use client'

import React, { useState, FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      // Wire this up to your own API route or form-handling service,
      // e.g. POST /api/contact, Resend, Formspree, etc.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error('Something went wrong sending your message.')

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-sm border border-[#4FA9A0]/40 bg-white px-6 py-8">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[#4FA9A0]">
          Message sent
        </p>
        <p className="mt-3 font-[family-name:var(--font-display)] text-xl text-[#14202B]">
          Thanks — we&apos;ll get back to you within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 font-[family-name:var(--font-mono)] text-sm text-[#3E4A52] underline decoration-[#C9A227] underline-offset-4"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[#475569]"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-sm border border-[#14202B]/20 bg-white px-4 py-3 text-[#14202B] outline-none focus:border-[#4FA9A0] focus:ring-1 focus:ring-[#4FA9A0]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[#475569]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-sm border border-[#14202B]/20 bg-white px-4 py-3 text-[#14202B] outline-none focus:border-[#4FA9A0] focus:ring-1 focus:ring-[#4FA9A0]"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="message"
          className="block font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[#475569]"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-none rounded-sm border border-[#14202B]/20 bg-white px-4 py-3 text-[#14202B] outline-none focus:border-[#4FA9A0] focus:ring-1 focus:ring-[#4FA9A0]"
        />
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-8 inline-block rounded-sm bg-[#12202B] px-7 py-3 font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.15em] text-[#F7F5F0] transition-colors hover:bg-[#0F1B24] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

export default ContactForm