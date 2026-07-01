import type { Company } from "../types/company";
import { useState } from "react";

type Props = {
    companies: Company[];
    onedit: (company: Company) => void;
    ondelete: (id: number) => void;
    onadd: (company: Company) => void;
};

const emptyCompany: Company = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    location: "",
    jobs: [],
};

function CompanyCard({ companies, onadd, onedit, ondelete }: Props) {
    const [editCompanyId, setEditCompanyId] = useState<number | null>(null);
    const [addform, setAddform] = useState<Company>(emptyCompany);
    const [editform, setEditform] = useState<Company>(emptyCompany);

    const handleAdd = () => {
        onadd(addform);
        setAddform(emptyCompany);
    };

    const startEdit = (company: Company) => {
        setEditCompanyId(company.id);
        setEditform(company);
    };

    const handleSave = () => {
        onedit(editform);
        setEditCompanyId(null);
    };

    const handleDelete = (id: number) => {
        ondelete(id);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={addform.name}
                    onChange={(e) => setAddform({ ...addform, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={addform.email}
                    onChange={(e) => setAddform({ ...addform, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={addform.phone}
                    onChange={(e) => setAddform({ ...addform, phone: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={addform.location}
                    onChange={(e) => setAddform({ ...addform, location: e.target.value })}
                />
                <button onClick={handleAdd}>Add</button>
            </div>
            <hr />

            {companies.map((company) => (
                <div key={company.id}>
                    {editCompanyId === company.id ? (
                        <>
                            <input
                                type="text"
                                value={editform.name}
                                onChange={(e) => setEditform({ ...editform, name: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editform.email}
                                onChange={(e) => setEditform({ ...editform, email: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editform.phone}
                                onChange={(e) => setEditform({ ...editform, phone: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editform.location}
                                onChange={(e) => setEditform({ ...editform, location: e.target.value })}
                            />
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setEditCompanyId(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <h1>{company.name}</h1>
                            <p>Email: {company.email}</p>
                            <p>Phone: {company.phone}</p>
                            <p>Location: {company.location}</p>
                            <button onClick={() => startEdit(company)}>Edit</button>
                            <button onClick={() => handleDelete(company.id)}>Delete</button>
                        </>
                    )}
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default CompanyCard;