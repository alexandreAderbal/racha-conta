import { atualizarSpinner } from "@Store/slices/spinner-slice";
import { useAppDispatch, useAppSelector } from "@Store/hooks";

export function useSpinner() {
  const dispatch = useAppDispatch();
  const { spinner } = useAppSelector((state) => state.spinnerSlice);

  const ativarSpinner = (msg?: string) => {
    dispatch(
      atualizarSpinner({
        ativo: true,
        msg,
      }),
    );
  };

  const desativarSpinner = (msg?: string) => {
    dispatch(
      atualizarSpinner({
        ativo: false,
      }),
    );
  };

  return {
    spinner,
    ativarSpinner,
    desativarSpinner,
  };
}
