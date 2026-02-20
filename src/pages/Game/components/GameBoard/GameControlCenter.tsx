import Button from "@shared/components/Button";

const GameControlCenter = ({ roomId }: { roomId: string }) => {
    return (
        <aside className="col-span-1 border-r border-slate-800 bg-slate-900 p-6 flex flex-col">
            <div className="flex-grow">
                <div className="p-4 bg-slate-800 rounded-md border-l-4 border-green-500">
                    <p className="text-lg font-semibold text-white">Your Turn</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <Button
                    variant="primary"
                    size="medium"
                    color="purple"
                >
                    Request
                </Button>
                <Button
                    variant="inverse"
                    size="medium"
                    color="purple"
                >
                    End Turn
                </Button>

            </div>
        </aside>
    )
}

export default GameControlCenter;