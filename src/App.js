import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
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

function NavigateId({ to }) {
  const { id } = useParams();
  return <Navigate to={to.replace(":id", id)} replace />
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/auth" element={<Navigate to="/web-obyavi-site/auth" />}/>
                <Route path="/reg" element={<Navigate to="/web-obyavi-site/reg" />}/>
                <Route path="/recovery" element={<Navigate to="/web-obyavi-site/recovery" />}/>
                <Route path="/c/search" element={<Navigate to="/web-obyavi-site/c/search" />}/>
                <Route path="/c/ad/:id" element={<NavigateId to="/web-obyavi-site/c/ad/:id" />}/>
                <Route path="/c/client/:id" element={<NavigateId to="/web-obyavi-site/c/client/:id" />}/>
                <Route path="/c/ad/new" element={<Navigate to="/web-obyavi-site/c/ad/new" />}/>
                <Route path="/c/chat/:id" element={<NavigateId to="/web-obyavi-site/c/chat/:id" />}/>
                <Route path="/c/ad/:id/edit" element={<NavigateId to="/web-obyavi-site/c/ad/:id/edit" />}/>
                <Route path="/c/profile/edit" element={<Navigate to="/web-obyavi-site/c/profile/edit" />}/>
                <Route path="/c/favorite" element={<Navigate to="/web-obyavi-site/c/favorite" />}/>
                <Route path="/c/client/:id/ads" element={<NavigateId to="/web-obyavi-site/c/client/:id/ads" />}/>
                <Route path="/c/client/:id/reviews" element={<NavigateId to="/web-obyavi-site/c/client/:id/reviews" />}/>
                <Route path="/c/chats" element={<Navigate to="/web-obyavi-site/c/chats" />}/>
                <Route path="/c/ads" element={<Navigate to="/web-obyavi-site/c/ads" />}/>
                <Route path="/c/profile" element={<Navigate to="/web-obyavi-site/c/profile" />}/>
                <Route path="/c/client/:id/reviews/new" element={<NavigateId to="/web-obyavi-site/c/client/:id/reviews/new" />}/>
                <Route path="/c/settings" element={<Navigate to="/web-obyavi-site/c/settings" />}/>
                <Route path="/c" element={<Navigate to="/web-obyavi-site/c" />}/>

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
