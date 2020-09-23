export default function () {
    this.route("conference", function () {
        this.route('schedule');
        this.route("actions", function () {
            this.route("show", {path: "/:id"});
        });
    });
};
