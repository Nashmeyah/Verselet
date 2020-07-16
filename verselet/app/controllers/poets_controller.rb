class PoetsController < ApplicationController
  before_action :set_poet, only: [:show, :update, :destroy]

  # GET /poets
  def index
    poets = Poet.all

    render json: poets
  end

  # GET /poets/1
  def show
    render json: @poet
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_poet
      @poet = Poet.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def poet_params
      params.require(:poet).permit(:name, :style)
    end
end
