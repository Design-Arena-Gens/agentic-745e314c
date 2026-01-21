"use client";

import { useState } from "react";
import { NoteDocument, NoteFolder } from "@/lib/types";
import { motion } from "framer-motion";
import { NotebookPenIcon, FolderPlus } from "lucide-react";

interface NotesPanelProps {
  folders: NoteFolder[];
  notes: NoteDocument[];
}

export default function NotesPanel({ folders, notes }: NotesPanelProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(folders[0]?.id ?? null);
  const [selectedNote, setSelectedNote] = useState<NoteDocument | null>(
    notes.find((note) => note.folderId === folders[0]?.id) ?? null
  );

  const folderNotes = notes.filter((note) => note.folderId === selectedFolder);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_2fr]">
      <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Notes</h2>
          <FolderPlus className="h-5 w-5 text-cyan-300" />
        </div>
        <div className="mt-4 space-y-3">
          {folders.map((folder) => (
            <button
              type="button"
              key={folder.id}
              className={`flex w-full flex-col rounded-2xl border border-white/10 px-4 py-3 text-left text-sm transition ${
                folder.id === selectedFolder ? "bg-white/10 text-white" : "bg-white/5 text-slate-300"
              }`}
              onClick={() => {
                setSelectedFolder(folder.id);
                setSelectedNote(folderNotes[0] ?? null);
              }}
            >
              <span className="font-semibold">{folder.title}</span>
              <span className="text-xs uppercase tracking-[0.32em] text-slate-400">{folder.tags.join(" · ")}</span>
            </button>
          ))}
        </div>
      </aside>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Notebook Canvas</h2>
            <p className="text-sm text-slate-300">Rich text editing with AI highlight extraction and tagging.</p>
          </div>
          <NotebookPenIcon className="h-5 w-5 text-emerald-300" />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {folderNotes.map((note) => (
            <button
              key={note.id}
              type="button"
              onClick={() => setSelectedNote(note)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                selectedNote?.id === note.id ? "bg-emerald-400/30" : "bg-white/10 text-slate-200"
              }`}
            >
              {note.title}
            </button>
          ))}
        </div>
        {selectedNote ? (
          <motion.article
            key={selectedNote.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm leading-relaxed text-slate-200"
          >
            <div dangerouslySetInnerHTML={{ __html: selectedNote.markdown.replace(/\n/g, "<br />") }} />
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-emerald-200">
              {selectedNote.highlights.map((highlight) => (
                <span key={highlight} className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1">
                  {highlight}
                </span>
              ))}
            </div>
          </motion.article>
        ) : (
          <p className="mt-6 text-sm text-slate-400">Select a note to view content.</p>
        )}
      </section>
    </div>
  );
}
