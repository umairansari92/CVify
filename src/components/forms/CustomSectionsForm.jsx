import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";
import { FaPlus, FaTrash, FaGripLines } from "react-icons/fa";

const CustomSectionsForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);
  const customSections = currentResume?.customSections || [];

  const updateSections = (newSections) => {
    dispatch(setResumeField({ field: "customSections", value: newSections }));
  };

  const addSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "New Section",
      items: [
        "Developing new initiatives...",
        "Coordinating cross-functional teams...",
      ],
    };
    updateSections([...customSections, newSection]);
  };

  const removeSection = (id) => {
    updateSections(customSections.filter((s) => s.id !== id));
  };

  const updateSectionTitle = (id, title) => {
    updateSections(
      customSections.map((s) => (s.id === id ? { ...s, title } : s)),
    );
  };

  const addItem = (sectionId) => {
    updateSections(
      customSections.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, ""] } : s,
      ),
    );
  };

  const updateItem = (sectionId, index, value) => {
    updateSections(
      customSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((item, i) => (i === index ? value : item)),
            }
          : s,
      ),
    );
  };

  const removeItem = (sectionId, index) => {
    updateSections(
      customSections.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((_, i) => i !== index) }
          : s,
      ),
    );
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] flex items-center gap-4">
            Custom Content Modules
            <span className="flex-1 h-px bg-border-subtle"></span>
          </h2>
          <p className="text-sm text-text-muted font-bold mt-3">
            Add specialized sections like Languages, Awards, Volunteering, or
            Publications.
          </p>
        </div>
        <button
          onClick={addSection}
          className="btn-primary-sm flex items-center gap-2 whitespace-nowrap"
        >
          <FaPlus size={12} /> Add New Section
        </button>
      </div>

      <div className="space-y-10">
        {customSections.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-border-subtle rounded-[2rem] bg-foreground/5">
            <p className="text-text-muted font-bold">
              No custom sections yet. Start by adding one!
            </p>
          </div>
        ) : (
          customSections.map((section) => (
            <div
              key={section.id}
              className="group bg-midground border-l-4 border-primary p-8 rounded-[2rem] shadow-sm relative animate-fadeIn"
            >
              {/* Section Header */}
              <div className="flex justify-between items-start gap-6 mb-8">
                <div className="flex-1 space-y-3">
                  <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) =>
                      updateSectionTitle(section.id, e.target.value)
                    }
                    placeholder="e.g. Languages, Volunteering"
                    className="input-premium lg:text-xl font-black"
                  />
                </div>
                <button
                  onClick={() => removeSection(section.id)}
                  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                  title="Remove entire section"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Items / Bullets */}
              <div className="space-y-4">
                <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-2">
                  Bullet Points
                </label>
                {section.items.map((item, index) => (
                  <div key={index} className="flex gap-4 group/item">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          updateItem(section.id, index, e.target.value)
                        }
                        placeholder="Detail your accomplishment or skill..."
                        className="input-premium-sm"
                      />
                    </div>
                    <button
                      onClick={() => removeItem(section.id, index)}
                      className="p-2.5 text-text-muted/40 hover:text-red-500 transition-colors"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addItem(section.id)}
                  className="flex items-center gap-2 text-xs font-black text-primary hover:text-action transition-colors px-3 py-2"
                >
                  <FaPlus size={10} /> Add Bullet Point
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomSectionsForm;
