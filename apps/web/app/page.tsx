import Link from "next/link";
import { io } from "next/cache";
import { Suspense } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  BookOpen,
  GraduationCap,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

async function Copyright() {
  await io();
  return <span>© {new Date().getFullYear()} Точка роста</span>;
}

const services = [
  {
    number: "01",
    title: "Индивидуальные занятия",
    description:
      "Разбираем темы и вопросы в комфортном темпе, уделяя внимание тому, что важно именно вам.",
    icon: GraduationCap,
  },
  {
    number: "02",
    title: "Помощь с учёбой",
    description:
      "Закрепляем пройденное, восполняем пробелы и учимся применять знания на практике.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Подготовка к целям",
    description:
      "Выстраиваем последовательный путь к вашим учебным задачам вместе с репетитором.",
    icon: Target,
  },
];
const steps = [
  {
    title: "Зарегистрируйтесь",
    description: "Создайте аккаунт, чтобы начать работу на платформе.",
  },
  {
    title: "Поставьте цель",
    description: "Обсудите с репетитором, чему хотите научиться.",
  },
  {
    title: "Занимайтесь и растите",
    description: "Изучайте новое и постепенно двигайтесь к результату.",
  },
];

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Точка роста — на главную"
      className="inline-flex items-center gap-2.5 whitespace-nowrap leading-none tracking-tight"
    >
      <span className="grid size-10 place-items-center rounded-full bg-[#223b32] text-xl font-bold text-white">
        т<span className="sr-only">очка роста</span>
      </span>
      <span className="text-lg">
        точка <b>роста</b>
        <small className="mt-1 block text-[9px] font-normal tracking-wide text-[#778079]">
          пространство обучения
        </small>
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#202624]">
      <header className="border-b border-[#e7e8e0]">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8 lg:min-h-24 lg:px-12">
          <Logo />
          <nav
            aria-label="Основная навигация"
            className="order-3 flex w-full gap-6 overflow-x-auto whitespace-nowrap py-1 text-sm text-[#59635c] lg:order-none lg:w-auto"
          >
            <a href="#approach">О нас</a>
            <a href="#services">Направления</a>
            <a href="#how">Как всё устроено</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Войти</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">
                Регистрация <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main>
        <section
          id="approach"
          className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20"
        >
          <div>
            <p className="text-[10px] font-bold tracking-[.14em] text-[#758075]">
              ● &nbsp; ОНЛАЙН · ИНДИВИДУАЛЬНО
            </p>
            <h1 className="mt-8 max-w-2xl font-serif text-5xl leading-[1.05] tracking-[-.055em] sm:text-6xl xl:text-[79px]">
              Знания, которые{" "}
              <em className="font-normal text-[#789364]">открывают</em>{" "}
              возможности<span className="text-[#9dbb57]">.</span>
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-[#69756d]">
              Занятия с репетитором в своём темпе. Разбираемся в сложном,
              закрепляем знания и уверенно движемся к вашим целям.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button asChild>
                <Link href="/register">
                  Начать обучение <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
              <a
                href="#how"
                className="inline-flex items-center gap-3 border-b border-[#aab2a4] py-2 text-sm font-semibold"
              >
                Как проходят занятия{" "}
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-3 text-xs leading-5 text-[#7b857b] lg:mt-16">
              <span className="grid size-10 place-items-center rounded-full bg-[#edf1e5] text-[#829f59]">
                <Asterisk aria-hidden="true" />
              </span>
              <span>
                Маленькие шаги сегодня —<br />
                <b className="text-[#415348]">большие результаты завтра</b>
              </span>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="relative h-[370px] overflow-hidden rounded bg-[#d9e6d9] text-[#385244] sm:h-[470px] lg:h-[510px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(#ffffff2c_1px,transparent_1px),linear-gradient(90deg,#ffffff2c_1px,transparent_1px)] bg-size-[48px_48px]" />
            <div className="absolute inset-x-7 top-7 flex justify-between text-[9px] font-bold tracking-widest">
              ПРОСТРАНСТВО ДЛЯ РОСТА <Asterisk className="size-6" />
            </div>
            <div className="absolute left-1/2 top-10 size-[360px] -translate-x-1/2 rounded-full border border-[#a3bba2]" />
            <div className="absolute left-1/2 top-[90px] size-[260px] -translate-x-1/2 rounded-full border border-[#a3bba2]" />
            <Asterisk
              className="absolute left-1/2 top-16 size-40 -translate-x-1/2 text-[#f5f3dc]"
              strokeWidth={1}
            />
            <div className="absolute left-1/2 top-40 w-[72%] -translate-x-1/2 -rotate-3 bg-[#fbfaf6] p-6 shadow-xl sm:top-48 sm:w-[62%]">
              <p className="text-[9px] tracking-widest text-[#8b9888]">
                ВАШ ПУТЬ
              </p>
              {["Знание", "Практика", "Уверенность"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-[#e4e9dd] py-3 font-serif text-xl last:border-0"
                >
                  {item}
                  <ArrowRight className="size-4 text-[#99af78]" />
                </div>
              ))}
            </div>
            <p className="absolute bottom-8 left-7 text-[10px] leading-4 tracking-widest">
              УЧИТЬСЯ МОЖНО
              <br />
              <strong>С ИНТЕРЕСОМ.</strong>
            </p>
            <span className="absolute bottom-8 right-7 text-[10px]">
              01 / 03
            </span>
          </div>
        </section>
        <div className="bg-[#293e34] text-[#e5ecd9]">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-8 overflow-x-auto whitespace-nowrap px-4 py-5 text-[9px] font-bold tracking-widest md:px-8 lg:px-12">
            {[
              "ПОНЯТНО ОБЪЯСНЯЕМ",
              "ЗАНИМАЕМСЯ В СВОЁМ ТЕМПЕ",
              "ДВИГАЕМСЯ К ЦЕЛИ",
              "ПОДДЕРЖИВАЕМ НА КАЖДОМ ШАГЕ",
            ].map((item) => (
              <span key={item} className="flex items-center gap-8">
                {item}
                <Asterisk
                  className="size-4 text-[#b9d476]"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        </div>
        <section
          id="services"
          className="mx-auto max-w-[1320px] px-4 py-20 md:px-8 lg:px-12 lg:py-28"
        >
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-[#758075]">
                01 / НАПРАВЛЕНИЯ
              </p>
              <h2 className="mt-5 font-serif text-5xl tracking-tight">
                Учиться становится
                <br />
                <em className="font-normal text-[#789364]">понятнее.</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#778079]">
              От первого вопроса до уверенного результата — подберём подход к
              вашей задаче.
            </p>
          </div>
          <div className="grid border-y border-[#dce1d8] md:grid-cols-3">
            {services.map(({ number, title, description, icon: Icon }) => (
              <article
                key={number}
                className="relative border-b border-[#dce1d8] py-7 pr-8 last:border-0 md:min-h-64 md:border-b-0 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"
              >
                <span className="text-[10px] tracking-widest text-[#9aa69a]">
                  {number} /
                </span>
                <Icon
                  className="absolute right-5 top-7 size-6 text-[#92ac79]"
                  aria-hidden="true"
                />
                <h3 className="mt-8 max-w-56 font-serif text-2xl">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#78827a]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section id="how" className="bg-[#e7ede2] py-20">
          <div className="mx-auto grid max-w-[1320px] gap-10 px-4 md:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-[#758075]">
                02 / КАК ЭТО РАБОТАЕТ
              </p>
              <h2 className="mt-5 font-serif text-5xl tracking-tight">
                Шаг за шагом
                <br />
                <em className="font-normal text-[#789364]">к своей цели.</em>
              </h2>
              <p className="my-6 max-w-xs text-sm leading-6 text-[#778079]">
                Начать просто: расскажите о своей задаче и переходите к
                занятиям.
              </p>
              <Button asChild>
                <Link href="/register">
                  Начать обучение <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div>
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-6 border-b border-[#bdcbbb] py-6 first:border-t"
                >
                  <span className="text-xs text-[#82927f]">0{index + 1}</span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#738071]">
                      {step.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="ml-auto size-5 shrink-0 text-[#829b75]"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer id="contacts" className="bg-[#283d33] pt-16 text-[#e2eade]">
        <div className="mx-auto max-w-[1320px] px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-8 pb-16 text-sm lg:grid-cols-[2fr_1fr_1fr_1fr]">
            <div className="col-span-2 lg:col-span-1">
              <Logo />
              <p className="mt-5 leading-6 text-[#c5d0c4]">
                Место, где знания становятся
                <br />
                вашей опорой.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="mb-2 text-[10px] tracking-widest text-[#a2b1a1]">
                НАВИГАЦИЯ
              </h3>
              <a href="#approach">О платформе</a>
              <a href="#services">Направления</a>
              <a href="#how">Как проходят занятия</a>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="mb-2 text-[10px] tracking-widest text-[#a2b1a1]">
                ЛИЧНЫЙ КАБИНЕТ
              </h3>
              <Link href="/login">Войти</Link>
              <Link href="/register">Регистрация</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="mb-2 text-[10px] tracking-widest text-[#a2b1a1]">
                ИНФОРМАЦИЯ
              </h3>
              <p>
                Онлайн-занятия
                <br />с репетитором
              </p>
              <Link href="/status">Состояние системы</Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-4 border-t border-white/20 py-5 text-[10px] tracking-wide text-[#a7b8a7]">
            <Suspense fallback={<span>© Точка роста</span>}>
              <Copyright />
            </Suspense>
            <span>УЧИТЬСЯ. ПОНИМАТЬ. РАСТИ.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
