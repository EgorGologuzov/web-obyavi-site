import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Access from "./hoc/Access";
import LayoutGuest from './pages/LayoutGuest';
import LayoutCard from './pages/LayoutCard';
import LayoutModer from './pages/LayoutModer';
import LayoutClient from './pages/LayoutClient';
import Elements from './pages/Elements';
import Auth from "./pages/general/Auth";
import Reg from "./pages/general/Reg";
import Recovery from "./pages/general/Recovery";
import Error from "./pages/general/Error";
import Presentation from "./pages/general/Presentation";
import AdModerationPageModer from "./pages/moder/AdModerationPageModer";
import AdPageModer from "./pages/moder/AdPageModer";
import ClientPageModer from "./pages/moder/ClientPageModer";
import ClientsListModer from "./pages/moder/ClientsListModer";
import ComplaintProcessingPageModer from "./pages/moder/ComplaintProcessingPageModer";
import DialoguePageModer from "./pages/moder/DialoguePageModer";
import ListOfClientAdsModer from "./pages/moder/ListOfClientAdsModer";
import ListOfClientDialogsModer from "./pages/moder/ListOfClientDialogsModer";
import ListOfClientReviewsModer from "./pages/moder/ListOfClientReviewsModer";
import ListOfRecordedViolationsModer from "./pages/moder/ListOfRecordedViolationsModer";
import MessageProcessingPageModer from "./pages/moder/MessageProcessingPageModer";
import ViolationPageModer from "./pages/moder/ViolationPageModer";
import AdSearchPageClient from "./pages/client/AdSearchPageClient";
import AdPageClient from "./pages/client/AdPageClient";
import ClientPageClient from "./pages/client/ClientPageClient";
import CreateAdPageClient from "./pages/client/CreateAdPageClient";
import DialoguePageClient from "./pages/client/DialoguePageClient";
import EditAdPageClient from "./pages/client/EditAdPageClient";
import EditProfilePageClient from "./pages/client/EditProfilePageClient";
import FavoritesListClient from "./pages/client/FavoritesListClient";
import ListOfClientAdsClient from "./pages/client/ListOfClientAdsClient";
import ListOfClientReviewsClient from "./pages/client/ListOfClientReviewsClient";
import MyAdsListClient from "./pages/client/MyAdsListClient";
import ProfilePageClient from "./pages/client/ProfilePageClient";
import ReviewWritingPageClient from "./pages/client/ReviewWritingPageClient";
import SettingsPageClient from "./pages/client/SettingsPageClient";
import ListOfDialogsClient from "./pages/client/ListOfDialogsClient";
import RoleNavigator from "./hoc/RoleNavigator";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/auth" element={<Navigate to="/web-obyavi-site/auth" />}/>

                <Route path="/web-obyavi-site/elements" element={<Elements />} />

                <Route index element={<RoleNavigator />} />

                <Route path="/web-obyavi-site" element={<LayoutGuest />}>
                    <Route path="presentation" element={<Presentation />}/>
                </Route>

                <Route path="/web-obyavi-site" element={<LayoutCard />}>
                    <Route path="auth" element={<Auth />} />
                    <Route path="reg" element={<Reg />} />
                    <Route path="recovery" element={<Recovery />} />
                </Route>

                <Route path="/web-obyavi-site/m" element={<Access role="moder"><LayoutModer /></Access>}>
                    <Route index element={<Navigate to="/m/ads"/>}/>
                    <Route path="ads" element={<AdModerationPageModer />} />
                    <Route path="ad/:id" element={<AdPageModer />} />
                    <Route path="client/:id" element={<ClientPageModer />} />
                    <Route path="clients" element={<ClientsListModer />} />
                    <Route path="complaints" element={<ComplaintProcessingPageModer />} />
                    <Route path="chat/:id" element={<DialoguePageModer />} />
                    <Route path="client/:id/ads" element={<ListOfClientAdsModer />} />
                    <Route path="client/:id/chats" element={<ListOfClientDialogsModer />} />
                    <Route path="client/:id/reviews" element={<ListOfClientReviewsModer />} />
                    <Route path="violations" element={<ListOfRecordedViolationsModer />} />
                    <Route path="messages" element={<MessageProcessingPageModer />} />
                    <Route path="violation/:id" element={<ViolationPageModer />} />
                </Route>

                <Route path="/web-obyavi-site/c" element={<Access role="client"><LayoutClient /></Access>}>
                    <Route index element={<Navigate to="/c/search"/>}/>
                    <Route path="search" element={<AdSearchPageClient />}/>
                    <Route path="ad/:id" element={<AdPageClient />} />
                    <Route path="client/:id" element={<ClientPageClient />} />
                    <Route path="ad/new" element={<CreateAdPageClient />} />
                    <Route path="chat/:id" element={<DialoguePageClient />} />
                    <Route path="ad/:id/edit" element={<EditAdPageClient />} />
                    <Route path="profile/edit" element={<EditProfilePageClient />} />
                    <Route path="favorite" element={<FavoritesListClient />} />
                    <Route path="client/:id/ads" element={<ListOfClientAdsClient />} />
                    <Route path="client/:id/reviews" element={<ListOfClientReviewsClient />} />
                    <Route path="chats" element={<ListOfDialogsClient />} />
                    <Route path="ads" element={<MyAdsListClient />} />
                    <Route path="profile" element={<ProfilePageClient />} />
                    <Route path="client/:id/reviews/new" element={<ReviewWritingPageClient />} />
                    <Route path="settings" element={<SettingsPageClient />} />
                </Route>

                <Route path="/web-obyavi-site/*" element={<Error code={404}/>}/>
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;
