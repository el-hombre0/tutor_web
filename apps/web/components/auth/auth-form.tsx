'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Eye, EyeOff, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateRegistration } from '@/lib/auth-validation';

/** Displays the sign-in or invitation-based registration form. */
export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const register = mode === 'register';
  const [role, setRole] = useState<'student' | 'parent'>('student');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (register) {
      const error = validateRegistration({ name: String(data.get('name') ?? ''), email: String(data.get('email') ?? ''), password: String(data.get('password') ?? ''), code: String(data.get('code') ?? ''), consent: data.has('consent') });
      if (error) { setMessage(error); return; }
    }
    setMessage(register ? 'Регистрация пока недоступна: подключение к серверу находится в разработке.' : 'Вход пока недоступен: подключение к серверу находится в разработке.');
  }

  return <div className="w-full max-w-[440px]">
    <div className="mb-8"><p className="mb-4 text-[10px] font-bold tracking-[.16em] text-[#849381]">{register ? 'НАЧАЛО ОБУЧЕНИЯ' : 'ЛИЧНЫЙ КАБИНЕТ'}</p><h1 className="font-serif text-[42px] leading-[1.08] tracking-[-.04em] text-[#263c33] sm:text-5xl">{register ? <>Рады знакомству<span className="text-[#95ad71]">.</span></> : <>С возвращением<span className="text-[#95ad71]">.</span></>}</h1><p className="mt-4 text-sm leading-6 text-[#778079]">{register ? 'Создайте аккаунт, чтобы все занятия и материалы были под рукой.' : 'Войдите в аккаунт, чтобы продолжить обучение.'}</p></div>
    <p className="mb-6 rounded-md border border-[#d8e2d0] bg-[#f1f5ed] p-3 text-xs leading-5 text-[#526b50]">Вход и регистрация пока находятся в разработке. Данные не отправляются.</p>
    {register && <fieldset className="mb-6"><legend className="mb-3 text-sm font-semibold text-[#34473b]">Я регистрируюсь как</legend><div className="grid grid-cols-2 gap-3">{([{value:'student', title:'Ученик', note:'Для занятий'}, {value:'parent', title:'Родитель', note:'Для связи с учеником'}] as const).map(item => <label key={item.value} className={`cursor-pointer rounded-lg border p-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#789364] ${role === item.value ? 'border-[#6e8b62] bg-[#eef3e9]' : 'border-[#dfe5db] bg-white hover:border-[#a8bca0]'}`}><input className="sr-only" type="radio" name="role-choice" value={item.value} checked={role === item.value} onChange={() => { setRole(item.value); setMessage(''); }} /><span className="flex items-center justify-between text-sm font-semibold text-[#34473b]">{item.title}<span className={`size-4 rounded-full border ${role === item.value ? 'border-[5px] border-[#688461]' : 'border-[#bcc8ba]'}`}/></span><span className="mt-1 block text-xs text-[#8b988b]">{item.note}</span></label>)}</div></fieldset>}
    <form onSubmit={submit} className="space-y-5">
      {register && <div><label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#34473b]">ФИО</label><Input id="name" name="name" autoComplete="name" placeholder="Как к вам обращаться" required /></div>}
      <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#34473b]">Электронная почта</label><Input id="email" name="email" type="email" autoComplete="email" placeholder="name@example.com" required /></div>
      <div><label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#34473b]">Пароль</label><div className="relative"><Input id="password" name="password" type={visible ? 'text' : 'password'} autoComplete={register ? 'new-password' : 'current-password'} placeholder={register ? 'Придумайте пароль' : 'Введите пароль'} className="pr-12" required /><button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-[#859384] focus-visible:outline-2 focus-visible:outline-[#789364]">{visible ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div>{register && <p className="mt-2 text-xs leading-5 text-[#89958a]">От 8 символов: латинские буквы в разном регистре и цифра.</p>}</div>
      {register && <><div><label htmlFor="code" className="mb-2 block text-sm font-semibold text-[#34473b]">{role === 'student' ? 'Код репетитора' : 'Код ученика'}</label><Input id="code" name="code" placeholder="Введите код приглашения" required /><p className="mt-2 text-xs leading-5 text-[#89958a]">{role === 'student' ? 'Получите код у вашего репетитора.' : 'Получите код у ученика для привязки аккаунта.'}</p></div><label className="flex items-start gap-3 text-xs leading-5 text-[#718072]"><input type="checkbox" name="consent" className="mt-1 size-4 accent-[#5c7957]" required /><span>Я согласен(на) на обработку персональных данных.</span></label></>}
      {message && <div role="alert" className="flex items-start gap-2 rounded-md border border-[#d8e2d0] bg-[#f1f5ed] p-3 text-sm leading-5 text-[#435f42]"><Info size={17} className="mt-0.5 shrink-0"/>{message}</div>}
      <Button type="submit" className="w-full justify-between">{register ? 'Создать аккаунт' : 'Войти в аккаунт'}<ArrowRight aria-hidden="true"/></Button>
    </form>
    <p className="mt-7 text-center text-sm text-[#7a887b]">{register ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта?'} {' '}<Link className="font-semibold text-[#405e43] underline-offset-4 hover:underline" href={register ? '/login' : '/register'}>{register ? 'Войти' : 'Зарегистрироваться'}</Link></p>
  </div>;
}
