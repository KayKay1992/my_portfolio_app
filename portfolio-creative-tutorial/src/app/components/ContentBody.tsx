import { Content, DateField, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/app/components/bounded";
import Heading from "@/slices/Biography/Heading";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", dateOptions).format(
        new Date(date)
      );
    }
  }

  const formattedDate = formatDate(page.data.date);
  return (
    <Bounded as="article" className="!py-16">
      <div className="rounded-2xl bg-slate-900/95 p-6 shadow-2xl ring-1 ring-slate-800/50 backdrop-blur-sm md:p-12">
        <Heading as="h1" className="mb-8 text-center justify-center flex flex-wrap">
          {page.data.title}{" "}
        </Heading>
        <div className="mb-8 flex flex-wrap justify-center gap- text-yellow-500">
          {page.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-yellow-500/10 px-4 py-1.5 text-sm font-semibold text-yellow-400 transition-transform hover:scale-105"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-lg mt-8 text-slate-400  border-b border-slate-600 ">
          Published on <time className="">{formatDate(page.data.date)}</time>
        </p>

        {/* Content */}
        <div
          className={`
            prose 
            prose-lg 
            max-w-none
            prose-headings:font-bold
            prose-headings:text-white
            prose-headings:tracking-tight
            prose-p:text-slate-300
            prose-p:leading-relaxed
            prose-a:text-yellow-400
            prose-a:font-medium
            prose-a:transition-colors
            prose-a:no-underline
            hover:prose-a:text-yellow-300
            prose-strong:text-white
            prose-blockquote:border-l-4
            prose-blockquote:border-yellow-500/50
            prose-blockquote:pl-6
            prose-blockquote: italic
            prose-blockquote:text-slate-400
            prose-code:bg-slate-800
            prose-code:rounded-md
            prose-code:px-1.5
            prose-code:py-0.5
            prose-code:text-white
            prose-pre:bg-slate-800
            prose-pre:rounded-xl
            prose-pre:p-4
            prose-img:rounded-xl
            prose-img:border
            prose-img:border-slate-700/50
            prose-img:shadow-lg
            prose-ul:pl-6
            prose-ul:text-slate-300
            prose-ol:pl-6
            prose-ol:text-slate-300
            prose-li:mb-2
            dark:prose-invert
            mt-12
           
          `}
        >
          <SliceZone slices={page.data.slices} components={components} />
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-800/50 pt-10 text-center">
          <p className="text-slate-400">Thank you for reading!</p>
        </footer>
      </div>
    </Bounded>
  );
}
