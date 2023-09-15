import type { ReactElement } from "react";
import { useMemo } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { useBreakpointsMatch } from "@front_web_mrmilu/hooks";
import { User } from "@/src/core/users/domain/models/user";
import { UserModal } from "@/src/ui/features/users/components/user_modal/user_modal";
import { useUiProvider } from "@/src/ui/providers/ui.provider";
import { useUsersListProvider } from "@/src/ui/features/users/state/users_list.provider";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import css from "./users_page.css";
import { SimpleCard } from "@/src/ui/components/simple_card/simple_card";

interface Props {
  serializedUsers: Array<Record<string, unknown>>;
}

export default function UsersPageWithProvider({ serializedUsers }: Props) {
  const usersDomain: Array<User> = useMemo(
    () => serializedUsers.map((value: Record<string, unknown>) => new User(value as ConstructorType<User>)),
    [serializedUsers]
  );
  const { mdAndUp } = useBreakpointsMatch();

  return (
    <useUsersListProvider.State initialState={{ users: usersDomain }}>
      <div className={css.wrapper}>
        {mdAndUp && <h1>Users page</h1>}
        <UsersList />
      </div>
    </useUsersListProvider.State>
  );
}

function UsersList() {
  const showModal = useUiProvider((state) => state.showModal);
  const users = useUsersListProvider((state) => state.users);

  const showUserModal = (user: User) => {
    showModal(<UserModal user={user} />);
  };

  return (
    <>
      {users.map((user, idx) => (
        <SimpleCard onClick={() => showUserModal(user)} key={`${user.id}_${idx}`} title={user.name} subtitle={user.email} />
      ))}
    </>
  );
}

UsersPageWithProvider.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout logged={page.props.logged}>{page}</BaseLayout>;
};
