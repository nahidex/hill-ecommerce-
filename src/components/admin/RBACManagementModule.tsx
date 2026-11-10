import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Key, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  UserCheck, 
  Building2, 
  MapPin, 
  Clock, 
  Plus, 
  Search,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  MinistryOfficer, 
  MinistryRBACPermission 
} from '../../types';
import { 
  SAMPLE_MINISTRY_OFFICERS, 
  MINISTRY_PERMISSIONS_LIST 
} from '../../data/adminMock';

interface RBACManagementModuleProps {
  officers?: MinistryOfficer[];
  onUpdateOfficerRole?: (officerId: string, newRole: any, permissions: string[]) => void;
}

export const RBACManagementModule: React.FC<RBACManagementModuleProps> = ({
  officers = SAMPLE_MINISTRY_OFFICERS,
  onUpdateOfficerRole = () => {}
}) => {
  const [officerList, setOfficerList] = useState<MinistryOfficer[]>(officers);
  const [selectedOfficer, setSelectedOfficer] = useState<MinistryOfficer | null>(null);
  const [editingPermissions, setEditingPermissions] = useState<string[]>([]);
  const [editingRole, setEditingRole] = useState<any>('verification_officer');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const rolesCatalog = [
    {
      id: 'super_admin',
      label: 'সুপার অ্যাডমিন (Super Admin)',
      designation: 'যুগ্মসচিব / অতিরিক্ত সচিব',
      description: 'প্ল্যাটফর্মের সর্বময় প্রশাসনিক ক্ষমতা, নিরাপত্তা সেটিংস, অর্থায়ন ও চূড়ান্ত অনুমোদন।',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    },
    {
      id: 'verification_officer',
      label: 'যাচাইকরণ কর্মকর্তা (Verification Officer)',
      designation: 'সহকারী পরিচালক / উপ-পরিচালক',
      description: 'কৃষক, সরবরাহকারী, পাইকারি ক্রেতা ও উদ্যোক্তাদের NID ও ট্রেড লাইসেন্স অনুমোদন।',
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-300'
    },
    {
      id: 'product_inspector',
      label: 'পণ্য ও বাজার তদারক কর্মকর্তা (Product Inspector)',
      designation: 'কৃষি বিপণন কর্মকর্তা / কোয়ালিটি স্পেশালিস্ট',
      description: 'পাইকারি লট অনুমোদন, গ্রেডিং ও কোয়ালিটি সার্টিফাই করা এবং পণ্য পর্যবেক্ষণ।',
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300'
    },
    {
      id: 'financial_auditor',
      label: 'আর্থিক নিরীক্ষক (Financial & Escrow Auditor)',
      designation: 'হিসাবরক্ষণ কর্মকর্তা / অডিটর',
      description: 'সোনালী ব্যাংক এসক্রো ট্রাস্ট অ্যাকাউন্ট পর্যবেক্ষণ, সেটেলমেন্ট ও রিফান্ড নিরীক্ষা।',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      id: 'dispute_mediator',
      label: 'লজিস্টিকস ও বিরোধ মধ্যস্থতাকারী (Dispute Mediator)',
      designation: 'ফিল্ড সমন্বয়ক / মধ্যস্থতাকারী',
      description: 'পাহাড়ি পরিবহন চালান পর্যবেক্ষণ এবং ক্রেতা-বিক্রেতা বিরোধ নিষ্পত্তি।',
      badgeColor: 'bg-stone-200 text-stone-900 border-stone-400'
    }
  ];

  const handleOpenEdit = (officer: MinistryOfficer) => {
    setSelectedOfficer(officer);
    setEditingRole(officer.ministryRole);
    setEditingPermissions([...officer.permissions]);
    setSaveSuccess(false);
  };

  const handleTogglePermission = (key: string) => {
    if (editingPermissions.includes(key)) {
      setEditingPermissions(editingPermissions.filter(p => p !== key));
    } else {
      setEditingPermissions([...editingPermissions, key]);
    }
  };

  const handleSaveOfficerPermissions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOfficer) return;

    const matchedRole = rolesCatalog.find(r => r.id === editingRole);

    setOfficerList(prev => prev.map(o => {
      if (o.id === selectedOfficer.id) {
        return {
          ...o,
          ministryRole: editingRole,
          ministryRoleLabel: matchedRole?.label || o.ministryRoleLabel,
          permissions: editingPermissions
        };
      }
      return o;
    }));

    onUpdateOfficerRole(selectedOfficer.id, editingRole, editingPermissions);
    setSaveSuccess(true);
    setTimeout(() => {
      setSelectedOfficer(null);
      setSaveSuccess(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-800" />
            <h3 className="text-base font-bold text-stone-900">
              ভূমিকা ও অনুমতি নিয়ন্ত্রণ (Role-Based Access Control - RBAC)
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের ৫টি প্রশাসনিক পদের সুনির্দিষ্ট ক্ষমতা ও দায়িত্ব বণ্টন
          </p>
        </div>
      </div>

      {/* 2. Five Administrative Roles Matrix Grid (§6) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 text-xs">
        {rolesCatalog.map((role) => (
          <div 
            key={role.id}
            className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border inline-block ${role.badgeColor}`}>
                {role.designation}
              </span>
              <h4 className="font-bold text-stone-900 text-xs">{role.label}</h4>
              <p className="text-stone-500 text-[11px] leading-relaxed">
                {role.description}
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100 text-[10px] text-emerald-900 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              <span>নির্ধারিত কার্যপরিধি সক্রিয়</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Ministry Officers Directory Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 bg-stone-50/60 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-stone-900 text-xs">মন্ত্রণালয়ের দায়িত্বপ্রাপ্ত কর্মকর্তাদের তালিকা ({officerList.length} জন)</h4>
            <p className="text-[11px] text-stone-500">প্রতিটি কর্মকর্তার কার্যপরিধি, অঞ্চল ও অনুমতি নিয়ন্ত্রণ করুন</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                <th className="py-3 px-4">কর্মকর্তার নাম ও পদবি</th>
                <th className="py-3 px-3">প্রশাসনিক রোল</th>
                <th className="py-3 px-3">অ্যাসাইনকৃত অঞ্চল</th>
                <th className="py-3 px-3">সক্রিয় অনুমতি সংখ্যা</th>
                <th className="py-3 px-3">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {officerList.map((officer) => (
                <tr key={officer.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-900">{officer.name}</div>
                    <div className="text-[11px] text-stone-500">{officer.designation}</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {officer.ministryRoleLabel}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-stone-700">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{officer.assignedDistrict}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-bold text-stone-900">{officer.permissions.length}টি অনুমতি</span>
                    <span className="text-[10px] text-stone-400 block">{officer.lastActive}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      officer.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-900' 
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {officer.status === 'active' ? 'সক্রিয়' : 'ছুটিতে'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenEdit(officer)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-bold text-xs flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3 text-stone-500" />
                      <span>ভূমিকা ও অনুমতি পরিবর্তন</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Officer Edit Role & Permission Modal */}
      {selectedOfficer && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-bengali">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in zoom-in-95">
            
            <div className="bg-gradient-to-r from-emerald-950 to-stone-900 p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-300 font-bold">RBAC কনফিগারেশন</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedOfficer.name}</h3>
                <p className="text-xs text-stone-300">{selectedOfficer.designation}</p>
              </div>
              <button 
                onClick={() => setSelectedOfficer(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOfficerPermissions} className="p-6 space-y-5 text-xs">
              
              {/* Role Select */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-800 block text-xs">
                  প্রশাসনিক পদবি / রোল নির্ধারণ করুন:
                </label>
                <select
                  value={editingRole}
                  onChange={(e) => setEditingRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                >
                  {rolesCatalog.map(r => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Permissions Checklist */}
              <div className="space-y-2">
                <label className="font-bold text-stone-800 block text-xs">
                  নির্দিষ্ট অনুমোদিত ক্ষমতা ও ফিচার অ্যাক্সেস:
                </label>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {MINISTRY_PERMISSIONS_LIST.map((perm) => {
                    const isChecked = editingPermissions.includes(perm.key);
                    return (
                      <label 
                        key={perm.key}
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                          isChecked ? 'bg-emerald-50/70 border-emerald-300' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleTogglePermission(perm.key)}
                          className="mt-0.5 rounded text-emerald-800 focus:ring-emerald-700 cursor-pointer"
                        />
                        <div className="space-y-0.5">
                          <div className="font-bold text-stone-900">{perm.name}</div>
                          <p className="text-[11px] text-stone-500 leading-snug">{perm.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-950 font-bold rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>ভূমিকা ও অনুমতি সফলভাবে হালনাগাদ করা হয়েছে!</span>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setSelectedOfficer(null)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-100 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  অনুমতি পরিবর্তন কার্যকর করুন
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
