function ProfileSetting() {
    return (
        <div className="mb-2 bg-white px-4 py-3">
            <h1 className="mb-4 text-2xl font-bold">Setting</h1>
            <div className="flex gap-x-16">
                <div className="flex flex-col gap-y-4">
                    <div className="settingLink">My profile</div>
                    <div className="settingLink">Member profile</div>
                    <div className="settingLink">Privacy settings</div>
                    <div className="settingLink">Tax Information</div>
                </div>
                <div className="flex flex-col gap-y-4">
                    <div className="settingLink">Manage Phones</div>
                    <div className="settingLink">Manage Accounts</div>
                    <div className="settingLink">Upload my photo</div>
                    <div className="settingLink">My transaction</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSetting;
