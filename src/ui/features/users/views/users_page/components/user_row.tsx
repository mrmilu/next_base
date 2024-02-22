"use client";
import { SimpleCard } from "@/src/ui/components/simple_card/simple_card";
import { useUiProvider } from "@/src/ui/providers/ui.provider";
import { User } from "@/src/core/users/domain/models/user";
import { UserModal } from "@/src/ui/features/users/components/user_modal/user_modal";
import { useMemo } from "react";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";

interface Props {
  user: Record<string, unknown>;
}
export default function UserRow({ user }: Props) {
  const userDomain = useMemo(() => new User(user as ConstructorType<User>), [user]);
  const showModal = useUiProvider((state) => state.showModal);
  const showUserModal = (user: User) => {
    showModal(<UserModal user={user} />);
  };

  return <SimpleCard onClick={() => showUserModal(userDomain)} title={userDomain.name} subtitle={userDomain.email} />;
}
